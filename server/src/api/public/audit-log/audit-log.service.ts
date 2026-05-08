import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { PaginationQueryDto } from '@libs/dto';
import { ActionKeys } from '@libs/types';
import { paginate } from '@libs/utils';
import { Injectable } from '@nestjs/common';
import { WorkspaceCommonService } from '../workspace-common/workspace-common.service';
import { CreateAuditLogDto } from './dto';

@Injectable()
export class AuditLogService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly workspaceCommonService: WorkspaceCommonService,
	) {}

	async createAuditLog<K extends ActionKeys>(
		dto: CreateAuditLogDto<K>,
		tx?: Prisma.TransactionClient,
	) {
		const {
			workspaceId,
			userId,
			actionKey,
			metadata,
			entityId,
			entityType,
			actorName,
		} = dto;

		const prisma = tx || this.prismaService;

		let finalActorName = actorName || null;

		if (!finalActorName && userId) {
			finalActorName = await this.getActorName(workspaceId, userId);
		}

		const auditLog = await prisma.auditLog.create({
			data: {
				workspaceId,
				userId: userId || null,
				actionKey,
				metadata: metadata as unknown as Prisma.InputJsonValue,
				entityId,
				entityType,
				actorName: finalActorName,
			},
		});

		return auditLog;
	}

	async getAuditLogs(
		workspaceId: string,
		userId: string,
		query: PaginationQueryDto,
	) {
		const { page = 1, limit = 20 } = query;

		const workspace = await this.workspaceCommonService.getWorkspace(
			workspaceId,
			userId,
		);

		const where: Prisma.AuditLogWhereInput = {
			workspaceId: workspace.id,
		};

		return await paginate({ page, limit }, async (limit, offset) => {
			const [total, items] = await this.prismaService.$transaction([
				this.prismaService.auditLog.count({ where }),
				this.prismaService.auditLog.findMany({
					where,
					skip: offset,
					take: limit,
					orderBy: {
						createdAt: 'desc',
					},
				}),
			]);

			return { items, total };
		});
	}

	async getActorName(workspaceId: string, userId: string) {
		const membership = await this.prismaService.workspaceMember.findFirst({
			where: { workspaceId, userId },
			select: {
				displayName: true,
				user: {
					select: {
						username: true,
						displayName: true,
					},
				},
			},
		});

		if (!membership) {
			return null;
		}

		return (
			membership.displayName ||
			membership.user.displayName ||
			membership.user.username
		);
	}
}
