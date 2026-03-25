import {
	ConflictException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import crypto from 'crypto';
import { EntityType, Link } from 'generated/prisma/client';
import { PrismaClientKnownRequestError } from 'generated/prisma/internal/prismaNamespace';
import { customAlphabet } from 'nanoid';
import ogs from 'open-graph-scraper';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import {
	ACTION_KEYS,
	ERRORS,
	PERMISSIONS,
	SUCCESS_MESSAGES,
} from 'src/libs/constants';
import { calculatePermissions, paginate } from 'src/libs/utils';
import { AuditLogService } from '../audit-log/audit-log.service';
import { ClickService } from '../click/click.service';
import { WorkspaceCommonService } from '../workspace-common/workspace-common.service';
import { WorkspaceService } from '../workspace/workspace.service';
import {
	BulkClaimLinksDto,
	CreateLinkDto,
	GetAllLinksDto,
	GetBySlugMetaDto,
} from './dto';

@Injectable()
export class LinkService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly clickService: ClickService,
		private readonly auditLogService: AuditLogService,
		private readonly workspaceService: WorkspaceService,
		private readonly workspaceCommonService: WorkspaceCommonService,
	) {}

	async createShortLink(dto: CreateLinkDto, userId?: string): Promise<Link> {
		const { originalUrl, customAlias, workspaceId } = dto;

		if (!userId && workspaceId)
			throw new ForbiddenException(
				ERRORS.LINK.WORKSPACE_ID_NOT_ALLOWED_FOR_GUEST,
			);

		let defaultWorkspaceId: string | null = null;

		if (userId && !workspaceId) {
			const defaultWorkspace =
				await this.workspaceService.getDefaultWorkspace(userId);
			defaultWorkspaceId = defaultWorkspace?.id || null;
		}

		if (customAlias) {
			if (!userId)
				throw new ForbiddenException(
					ERRORS.LINK.CUSTOM_ALIAS_NOT_AUTHENTICATED,
				);

			if (!workspaceId)
				throw new ForbiddenException(
					ERRORS.LINK.WORKSPACE_ID_REQUIRED_FOR_CUSTOM_ALIAS,
				);

			const existing = await this.prismaService.link.findUnique({
				where: { slug: customAlias },
			});

			if (existing)
				throw new ConflictException(ERRORS.LINK.CUSTOM_ALIAS_ALREADY_EXISTS);
		}

		if (userId && workspaceId) {
			const workspace = await this.workspaceCommonService.getWorkspace(
				workspaceId,
				userId,
			);

			if (userId !== workspace.ownerId) {
				const member = workspace.members?.[0];

				if (!member)
					throw new ForbiddenException(ERRORS.WORKSPACE.NO_PERMISSION);

				const permissions = calculatePermissions(member);
				const hasPermission =
					permissions.includes(PERMISSIONS.ADMIN.ALL) ||
					permissions.includes(PERMISSIONS.LINKS.CREATE);

				if (!hasPermission)
					throw new ForbiddenException(
						ERRORS.LINK.USER_DOES_NOT_HAVE_PERMISSION_TO_CREATE_LINK,
					);
			}
		}

		let claimToken: string | null = null;
		let hashedClaimToken: string | null = null;

		if (!userId) {
			claimToken = crypto.randomBytes(32).toString('hex');
			hashedClaimToken = crypto
				.createHash('sha256')
				.update(claimToken)
				.digest('hex');
		}

		const alphabet =
			'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		const slug = customAlias || customAlphabet(alphabet, 6)();

		let ogInfo: {
			title: string | null;
			siteName: string | null;
		} = { title: null, siteName: null };

		try {
			const ogData = await ogs({ url: originalUrl });
			const { ogTitle, ogSiteName } = ogData.result;
			ogInfo = {
				title: ogTitle || null,
				siteName: ogSiteName || ogTitle || null,
			};
		} catch (e) {
			console.warn(
				`Failed to fetch OG data for ${originalUrl}, proceeding without it.`,
				e,
			);
		}

		const domain = new URL(originalUrl).hostname.replace('www.', '');

		try {
			return await this.prismaService.$transaction(async (tx) => {
				const newLink = await tx.link.create({
					data: {
						originalUrl,
						slug,
						claimToken: hashedClaimToken,
						userId: userId || null,
						workspaceId: workspaceId || defaultWorkspaceId || null,
						domain,
						...ogInfo,
					},
				});

				if (workspaceId && userId) {
					await this.auditLogService.createAuditLog(
						{
							workspaceId,
							actionKey: ACTION_KEYS.LINK.CREATED,
							userId: userId,
							metadata: {
								slug: newLink.slug,
								originalUrl: newLink.originalUrl,
							},
							entityType: EntityType.LINK,
							entityId: newLink.id,
						},
						tx,
					);
				}

				return {
					...newLink,
					claimToken: claimToken,
				};
			});
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === 'P2002'
			) {
				if (customAlias)
					throw new ConflictException(ERRORS.LINK.CUSTOM_ALIAS_ALREADY_EXISTS);

				return await this.createShortLink(dto, userId);
			}
			throw error;
		}
	}

	async claimLinks(userId: string, dto: BulkClaimLinksDto) {
		const linkIds = dto.links.map((link) => link.linkId);

		const workspace = await this.workspaceService.getDefaultWorkspace(userId);

		if (!workspace)
			throw new NotFoundException(ERRORS.WORKSPACE.DEFAULT_WORKSPACE_NOT_FOUND);

		return await this.prismaService.$transaction(async (tx) => {
			const links = await tx.link.findMany({
				where: { id: { in: linkIds }, userId: null, claimToken: { not: null } },
			});

			const linksToClaimIds: string[] = [];

			for (const link of links) {
				const claimItem = dto.links.find((item) => item.linkId === link.id);

				if (!claimItem) continue;
				if (link.userId) continue;

				const hashedToken = this.hashToken(claimItem.claimToken);

				if (link.claimToken !== hashedToken)
					throw new ForbiddenException(`Invalid token for link ${link.id}`);

				linksToClaimIds.push(link.id);
			}

			if (linksToClaimIds.length > 0) {
				const updatedLinks = await tx.link.updateManyAndReturn({
					where: {
						id: { in: linksToClaimIds },
						userId: null,
						claimToken: { not: null },
					},
					data: { userId, claimToken: null },
				});

				await this.auditLogService.createAuditLog(
					{
						actionKey: ACTION_KEYS.LINK.CLAIMED,
						userId,
						metadata: {
							count: updatedLinks.length,
							slugs: updatedLinks.map((link) => link.slug),
						},
						entityType: EntityType.LINK,
						entityId: workspace.id,
						workspaceId: workspace.id,
					},
					tx,
				);
			}

			return { success: true };
		});
	}

	async getBySlug(slug: string, metaDto: GetBySlugMetaDto) {
		const { ip, userAgent, referer } = metaDto;

		const link = await this.getBySlugWithoutTracking(slug);

		await this.prismaService.$transaction(async (tx) => {
			const click = await this.clickService.createClick(
				{
					linkId: link.id,
					ip,
					userAgent,
					referer,
				},
				tx,
			);

			await tx.link.update({
				where: { id: link.id },
				data: {
					totalClicks: { increment: 1 },
					uniqueClicks: click.isUnique ? { increment: 1 } : undefined,
				},
			});
		});

		return link;
	}

	async getBySlugWithoutTracking(slug: string) {
		const link = await this.prismaService.link.findUnique({
			where: { slug },
		});

		if (!link) throw new NotFoundException(ERRORS.LINK.LINK_NOT_FOUND);

		return link;
	}

	async findById(id: string) {
		const link = await this.prismaService.link.findUnique({
			where: { id },
		});

		if (!link) throw new NotFoundException(ERRORS.LINK.LINK_NOT_FOUND);

		return link;
	}

	async getAllWorkspaceLinks(workspaceId: string, query: GetAllLinksDto) {
		const {
			page = 1,
			limit = 20,
			sortBy = 'createdAt',
			sortOrder = 'desc',
		} = query;

		return await paginate({ page, limit }, async (limit, offset) => {
			const [total, links] = await this.prismaService.$transaction([
				this.prismaService.link.count({ where: { workspaceId } }),
				this.prismaService.link.findMany({
					where: { workspaceId },
					skip: offset,
					take: limit,
					orderBy: { [sortBy]: sortOrder },
				}),
			]);

			return { items: links, total };
		});
	}

	async getWorkspaceLink(workspaceId: string, linkId: string) {
		const link = await this.prismaService.link.findFirst({
			where: { id: linkId, workspaceId },
		});

		if (!link)
			throw new NotFoundException(ERRORS.LINK.LINK_NOT_FOUND_IN_WORKSPACE);

		return link;
	}

	async getUserLinks(userId: string, query: GetAllLinksDto) {
		const {
			page = 1,
			limit = 20,
			sortBy = 'createdAt',
			sortOrder = 'desc',
		} = query;

		const safePage = Math.max(Number(page), 1);
		const safeSize = Math.max(Number(limit), 1);
		const offset = (safePage - 1) * safeSize;

		const [total, links] = await this.prismaService.$transaction([
			this.prismaService.link.count({ where: { userId } }),
			this.prismaService.link.findMany({
				where: { userId },
				orderBy: { [sortBy]: sortOrder },
				skip: offset,
				take: safeSize,
			}),
		]);

		return {
			meta: {
				total,
				page: safePage,
				limit: safeSize,
				totalPages: Math.ceil(total / safeSize),
			},
			items: links,
		};
	}

	async removeLink(id: string, userId: string) {
		const link = await this.findById(id);

		if (link.userId !== userId)
			throw new ForbiddenException(
				ERRORS.LINK.USER_DOES_NOT_HAVE_PERMISSION_TO_DELETE_LINK,
			);

		await this.prismaService.$transaction(async (tx) => {
			await tx.link.update({
				where: { id: link.id, userId },
				data: { deletedAt: new Date() },
			});

			if (link.workspaceId) {
				await this.auditLogService.createAuditLog(
					{
						workspaceId: link.workspaceId,
						actionKey: ACTION_KEYS.LINK.DELETED,
						userId,
						metadata: {
							slug: link.slug,
							title: link.title || '',
						},
						entityType: EntityType.LINK,
						entityId: link.id,
					},
					tx,
				);
			}
		});

		return SUCCESS_MESSAGES.LINK.LINK_DELETED;
	}

	private hashToken(token: string): string {
		return crypto.createHash('sha256').update(token).digest('hex');
	}
}
