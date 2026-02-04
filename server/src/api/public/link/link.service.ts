import {
	ConflictException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import crypto from 'crypto';
import { Link } from 'generated/prisma/client';
import { PrismaClientKnownRequestError } from 'generated/prisma/internal/prismaNamespace';
import { customAlphabet } from 'nanoid';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ClickService } from '../click/click.service';
import { BulkClaimLinksDto, CreateLinkDto, GetBySlugMetaDto } from './dto';

@Injectable()
export class LinkService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly clickService: ClickService,
	) {}

	async createShortLink(dto: CreateLinkDto, userId?: string): Promise<Link> {
		const { originalUrl, customAlias } = dto;

		let claimToken: string | undefined = undefined;
		let hashedClaimToken: string | undefined = undefined;

		if (!userId) {
			claimToken = crypto.randomBytes(32).toString('hex');
			hashedClaimToken = crypto
				.createHash('sha256')
				.update(claimToken)
				.digest('hex');
		}

		if (userId && customAlias) {
			const existingLink = await this.prismaService.link.findUnique({
				where: { slug: customAlias },
			});

			if (existingLink)
				throw new ConflictException('Custom alias is already in use.');

			const newLink = await this.prismaService.link.create({
				data: {
					originalUrl,
					slug: customAlias,
					user: { connect: { id: userId } },
				},
			});

			return newLink;
		} else if (customAlias && !userId) {
			throw new ForbiddenException(
				'Custom alias can only be set by authenticated users.',
			);
		}

		try {
			const alphabet =
				'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
			const generateSlug = customAlphabet(alphabet, 6);
			const slug = generateSlug();

			const newLink = await this.prismaService.link.create({
				data: {
					originalUrl,
					slug,
					claimToken: hashedClaimToken,
					...(userId ? { user: { connect: { id: userId } } } : {}),
				},
			});

			return {
				...newLink,
				claimToken: claimToken || null,
			};
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === 'P2002'
			) {
				return await this.createShortLink(dto, userId);
			}

			throw error;
		}
	}

	async claimLinks(userId: string, dto: BulkClaimLinksDto) {
		const linkIds = dto.links.map((link) => link.linkId);

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

				if (link.claimToken !== hashedToken) {
					throw new ForbiddenException(`Invalid token for link ${link.id}`);
				}

				linksToClaimIds.push(link.id);
			}

			if (linksToClaimIds.length > 0) {
				await Promise.all(
					linksToClaimIds.map((linkId) =>
						tx.link.update({
							where: { id: linkId, userId: null, claimToken: { not: null } },
							data: { userId, claimToken: null },
						}),
					),
				);
			}

			return { success: true };
		});
	}

	async getBySlug(slug: string, metaDto: GetBySlugMetaDto) {
		const { ip, userAgent, referer } = metaDto;

		const link = await this.prismaService.link.findUnique({
			where: { slug },
		});

		if (!link) throw new NotFoundException('Link not found.');

		const click = await this.clickService.createClick({
			linkId: link.id,
			ip,
			userAgent,
			referer,
		});

		await this.prismaService.link.update({
			where: { id: link.id },
			data: {
				totalClicks: { increment: 1 },
				uniqueClicks: click.isUnique ? { increment: 1 } : undefined,
			},
		});

		return link;
	}

	async findById(id: string) {
		const link = await this.prismaService.link.findUnique({
			where: { id },
		});

		if (!link) throw new NotFoundException('Link not found.');

		return link;
	}

	async getUserLinks(userId: string) {
		return await this.prismaService.link.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' },
		});
	}

	async removeLink(id: string, userId: string) {
		const link = await this.findById(id);

		if (link.userId !== userId) {
			throw new ForbiddenException(
				'You do not have permission to delete this link.',
			);
		}

		await this.prismaService.link.delete({ where: { id: link.id, userId } });

		return true;
	}

	private hashToken(token: string): string {
		return crypto.createHash('sha256').update(token).digest('hex');
	}
}
