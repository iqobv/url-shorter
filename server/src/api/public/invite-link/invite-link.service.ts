import { EntityType } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ACTION_KEYS, ERRORS } from '@libs/constants';
import { publicUserSelect } from '@libs/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditLogService } from '../audit-log/audit-log.service';
import { WorkspaceCommonService } from '../workspace-common/workspace-common.service';
import { WorkspaceMemberService } from '../workspace-member/workspace-member.service';
import { CreateInviteLinkDto } from './dto';

@Injectable()
export class InviteLinkService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly auditLogService: AuditLogService,
		private readonly workspaceMemberService: WorkspaceMemberService,
		private readonly workspaceCommonService: WorkspaceCommonService,
	) {}

	async createInviteLink(userId: string, dto: CreateInviteLinkDto) {
		const { roleId, workspaceId, expiresAt, maxUseCount } = dto;

		const workspace = await this.workspaceCommonService.getWorkspace(
			workspaceId,
			userId,
		);

		const code = await this.generateInviteCode();

		return await this.prismaService.$transaction(async (tx) => {
			const inviteLink = await tx.inviteLink.create({
				data: {
					role: { connect: { id: roleId } },
					workspace: { connect: { id: workspace.id } },
					createdByUser: { connect: { id: userId } },
					code,
					expiresAt,
					maxUseCount,
				},
				include: {
					role: true,
				},
			});

			await this.auditLogService.createAuditLog(
				{
					actionKey: ACTION_KEYS.INVITE_LINK.CREATED,
					workspaceId,
					userId,
					metadata: {
						code: inviteLink.code,
						expiresAt: inviteLink.expiresAt,
						roleName: inviteLink.role.name,
					},
					entityId: inviteLink.id,
					entityType: EntityType.INVITE_LINK,
				},
				tx,
			);

			return await tx.inviteLink.findUnique({
				where: { id: inviteLink.id },
			});
		});
	}

	async getInviteLinks(workspaceId: string, userId: string) {
		const workspace = await this.workspaceCommonService.getWorkspace(
			workspaceId,
			userId,
		);

		return await this.prismaService.inviteLink.findMany({
			where: {
				workspaceId: workspace.id,
			},
			include: {
				role: true,
				createdByUser: {
					select: publicUserSelect,
				},
			},
		});
	}

	async findInviteLinkById(inviteLinkId: string, workspaceId: string) {
		const inviteLink = await this.prismaService.inviteLink.findUnique({
			where: { id: inviteLinkId, workspaceId },
		});

		if (!inviteLink)
			throw new NotFoundException(ERRORS.INVITE_LINK.INVITE_LINK_NOT_FOUND);

		return inviteLink;
	}

	async deleteInviteLink(
		inviteLinkId: string,
		workspaceId: string,
		userId: string,
	) {
		const workspace = await this.workspaceCommonService.getWorkspace(
			workspaceId,
			userId,
		);

		const inviteLink = await this.findInviteLinkById(
			inviteLinkId,
			workspace.id,
		);

		await this.prismaService.$transaction(async (tx) => {
			await tx.inviteLink.delete({
				where: { id: inviteLink.id, workspaceId: workspace.id },
			});

			await this.auditLogService.createAuditLog(
				{
					actionKey: ACTION_KEYS.INVITE_LINK.DELETED,
					workspaceId,
					userId,
					metadata: {
						code: inviteLink.code,
					},
					entityId: inviteLink.id,
					entityType: EntityType.INVITE_LINK,
				},
				tx,
			);
		});
	}

	async useInviteLink(code: string, userId: string) {
		const inviteLink = await this.prismaService.inviteLink.findUnique({
			where: { code },
		});

		if (!inviteLink)
			throw new NotFoundException(ERRORS.INVITE_LINK.INVITE_LINK_NOT_FOUND);

		if (inviteLink.expiresAt && inviteLink.expiresAt < new Date())
			throw new NotFoundException(ERRORS.INVITE_LINK.INVITE_LINK_EXPIRED);

		if (inviteLink.maxUseCount && inviteLink.useCount >= inviteLink.maxUseCount)
			throw new NotFoundException(ERRORS.INVITE_LINK.INVITE_LINK_ALREADY_USED);

		await this.prismaService.$transaction(async (tx) => {
			await tx.inviteLink.update({
				where: { id: inviteLink.id },
				data: { useCount: { increment: 1 } },
			});

			const invitedByName = await this.auditLogService.getActorName(
				inviteLink.workspaceId,
				inviteLink.createdByUserId,
			);

			await this.workspaceMemberService.createWorkspaceMember(
				inviteLink.workspaceId,
				userId,
				userId,
				{
					invitedByUserId: inviteLink.createdByUserId,
					roleIds: [inviteLink.roleId],
					invitedByInviteLinkId: inviteLink.code,
					invitedByName: invitedByName || 'Unknown',
				},
				tx,
			);
		});

		return {
			workspaceId: inviteLink.workspaceId,
		};
	}

	private async generateInviteCode() {
		let code = '';
		let isUnique = false;
		let attempts = 0;

		while (!isUnique && attempts < 5) {
			code = Math.random().toString(36).substring(2, 12);
			const existingLink = await this.prismaService.inviteLink.findUnique({
				where: { code },
			});
			if (!existingLink) {
				isUnique = true;
			} else {
				attempts++;
			}
		}
		return code;
	}
}
