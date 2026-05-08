import { EntityType, Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import {
	ACTION_KEYS,
	ERRORS,
	PERMISSIONS,
	SUCCESS_MESSAGES,
} from '@libs/constants';
import { publicUserSelect } from '@libs/prisma';
import { calculatePermissions } from '@libs/utils';
import {
	ConflictException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { AuditLogService } from '../audit-log/audit-log.service';
import { WorkspaceCommonService } from '../workspace-common/workspace-common.service';
import { CreateWorkspaceMemberDto, UpdateWorkspaceMemberDto } from './dto';
import { MemberWithUser } from './types';

@Injectable()
export class WorkspaceMemberService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly workspaceCommonService: WorkspaceCommonService,
		private readonly auditLogService: AuditLogService,
	) {}

	async createWorkspaceMember(
		workspaceId: string,
		userId: string,
		authUserId: string,
		dto: CreateWorkspaceMemberDto,
		tx?: Prisma.TransactionClient,
	) {
		const { invitedByUserId, invitedByInviteLinkId, roleIds, invitedByName } =
			dto;

		const workspace = await this.workspaceCommonService.getWorkspace(
			workspaceId,
			invitedByUserId ?? authUserId,
		);

		const prisma = tx || this.prismaService;

		const existingMember = await prisma.workspaceMember.findFirst({
			where: { workspaceId: workspace.id, userId },
		});

		if (existingMember && !existingMember.deletedAt)
			throw new ConflictException(ERRORS.WORKSPACE_MEMBER.USER_ALREADY_MEMBER);

		const execute = async (client: Prisma.TransactionClient) => {
			const member = await client.workspaceMember.create({
				data: {
					workspace: { connect: { id: workspace.id } },
					user: { connect: { id: userId } },
					inviteLink: invitedByInviteLinkId
						? { connect: { id: invitedByInviteLinkId } }
						: undefined,
					invitedByUser: invitedByUserId
						? { connect: { id: invitedByUserId } }
						: undefined,
					roles: {
						create: roleIds.map((id: string) => ({
							role: { connect: { id } },
						})),
					},
				},
				include: {
					user: { select: publicUserSelect },
				},
			});

			await this.auditLogService.createAuditLog(
				{
					actionKey: ACTION_KEYS.WORKSPACE_MEMBER.INVITED,
					workspaceId: workspace.id,
					userId: invitedByUserId ?? authUserId,
					entityId: member.id,
					entityType: EntityType.WORKSPACE_MEMBER,
					metadata: {
						invitedByName: invitedByName || 'Unknown',
						targetName:
							member.displayName ||
							member.user.displayName ||
							member.user.username,
						inviteMethod: invitedByInviteLinkId ? 'invite_link' : 'user',
						inviteLinkCode: invitedByInviteLinkId,
					},
				},
				client,
			);

			return member;
		};

		return tx
			? await execute(tx)
			: await this.prismaService.$transaction(execute);
	}

	async createInitialWorkspaceMember(
		workspaceId: string,
		userId: string,
		roleId: string,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.prismaService;

		return await prisma.workspaceMember.create({
			data: {
				workspace: { connect: { id: workspaceId } },
				user: { connect: { id: userId } },
				roles: {
					create: {
						role: { connect: { id: roleId } },
					},
				},
			},
		});
	}

	async getWorkspaceMembers(workspaceId: string, userId: string) {
		const workspace = await this.workspaceCommonService.getWorkspace(
			workspaceId,
			userId,
		);

		const members = await this.prismaService.workspaceMember.findMany({
			where: { workspaceId: workspace.id },
			include: {
				user: {
					select: publicUserSelect,
				},
				roles: {
					include: {
						role: true,
					},
				},
			},
		});

		const mappedMembers = members.map(
			({ roles, displayName, user, ...rest }) => ({
				...rest,
				displayName: displayName || user.displayName || user.username,
				roles: roles.map((role) => role.role),
			}),
		);

		return mappedMembers;
	}

	async getWorkspaceMember(
		workspaceId: string,
		memberId: string,
		authUserId: string,
	) {
		const workspace = await this.workspaceCommonService.getWorkspace(
			workspaceId,
			authUserId,
		);

		const member = await this.prismaService.workspaceMember.findFirst({
			where: { workspaceId: workspace.id, id: memberId },
			include: {
				user: { select: publicUserSelect },
				roles: {
					include: {
						role: true,
					},
				},
			},
		});

		if (!member || member.deletedAt)
			throw new NotFoundException(
				ERRORS.WORKSPACE_MEMBER.WORKSPACE_MEMBER_NOT_FOUND,
			);

		return member;
	}

	async getWorkspaceMemberPermissions(workspaceId: string, userId: string) {
		const workspace = await this.workspaceCommonService.getWorkspaceById(
			workspaceId,
			userId,
		);

		const member = workspace.members.find((m) => m.userId === userId);

		if (!member || member.deletedAt)
			throw new NotFoundException(
				ERRORS.WORKSPACE_MEMBER.WORKSPACE_MEMBER_NOT_FOUND,
			);

		const adminKey = PERMISSIONS.ADMIN.ALL;

		const hasAdminRole =
			member.permissions.includes(adminKey) &&
			member.roles.map((r) => r.role.permissions.includes(adminKey));

		const permissions =
			workspace.ownerId === userId || workspace.isPersonal
				? [adminKey]
				: hasAdminRole
					? [adminKey]
					: calculatePermissions(member);

		return permissions;
	}

	async updateWorkspaceMember(
		workspaceId: string,
		memberId: string,
		authUserId: string,
		dto: UpdateWorkspaceMemberDto,
	) {
		const {
			permissions,
			roleIds,
			invitedByName: _invitedByName,
			...memberFields
		} = dto;

		const workspace = await this.workspaceCommonService.getWorkspace(
			workspaceId,
			authUserId,
		);
		const member = await this.getWorkspaceMember(
			workspaceId,
			memberId,
			authUserId,
		);

		return await this.prismaService.$transaction(async (tx) => {
			if (Object.keys(memberFields).length) {
				const updatedMember = await tx.workspaceMember.update({
					where: { id: member.id, workspaceId: workspace.id },
					data: memberFields,
				});

				await this.auditLogService.createAuditLog(
					{
						workspaceId: workspace.id,
						userId: authUserId,
						actionKey: ACTION_KEYS.WORKSPACE_MEMBER.EDITED,
						entityId: member.id,
						entityType: EntityType.WORKSPACE_MEMBER,
						metadata: {
							changes: Object.keys(memberFields).map((key) => {
								const field = key as keyof typeof memberFields;

								return {
									field: String(field),
									oldValue: member[field],
									newValue: updatedMember[field],
								};
							}),
							targetName:
								member.displayName ||
								member.user.displayName ||
								member.user.username,
						},
					},
					tx,
				);
			}

			if (permissions) {
				await this.syncPermissions(tx, member, permissions, authUserId);
			}

			if (roleIds) {
				await this.syncRoles(tx, member, workspace.id, roleIds, authUserId);
			}

			return await tx.workspaceMember.findUnique({
				where: { id: member.id, workspaceId: workspace.id },
				include: {
					user: {
						select: publicUserSelect,
					},
					roles: {
						include: {
							role: true,
						},
					},
				},
			});
		});
	}

	async deleteWorkspaceMember(
		workspaceId: string,
		memberId: string,
		authUserId: string,
	) {
		const workspace = await this.workspaceCommonService.getWorkspace(
			workspaceId,
			authUserId,
		);
		const member = await this.getWorkspaceMember(
			workspaceId,
			memberId,
			authUserId,
		);

		if (authUserId === member.userId)
			throw new ForbiddenException(ERRORS.WORKSPACE_MEMBER.CANNOT_REMOVE_SELF);

		if (workspace.ownerId === member.userId)
			throw new ConflictException(
				ERRORS.WORKSPACE_MEMBER.WORKSPACE_OWNER_CANNOT_BE_REMOVED,
			);

		await this.prismaService.workspaceMember.update({
			where: {
				id: member.id,
				userId_workspaceId: {
					userId: member.userId,
					workspaceId: workspace.id,
				},
			},
			data: { deletedAt: new Date() },
		});

		return SUCCESS_MESSAGES.WORKSPACE_MEMBER.WORKSPACE_MEMBER_REMOVED;
	}

	private async syncRoles(
		tx: Prisma.TransactionClient,
		member: MemberWithUser,
		workspaceId: string,
		newRoleIds: string[],
		authUserId: string,
	) {
		const memberId = member.id;

		const currentRoles = await tx.memberRole.findMany({
			where: { memberId },
			include: { role: true },
		});

		const oldRoleIds = currentRoles.map((r) => r.roleId);

		const added = newRoleIds.filter((id) => !oldRoleIds.includes(id));
		const removed = oldRoleIds.filter((id) => !newRoleIds.includes(id));

		if (added.length || removed.length) {
			await tx.memberRole.deleteMany({
				where: {
					memberId,
					roleId: { in: removed },
				},
			});

			await tx.memberRole.createMany({
				data: added.map((roleId) => ({
					memberId,
					roleId,
				})),
			});

			await this.auditLogService.createAuditLog(
				{
					workspaceId,
					userId: authUserId,
					actionKey: ACTION_KEYS.WORKSPACE_MEMBER.ROLES_UPDATED,
					entityId: memberId,
					entityType: EntityType.WORKSPACE_MEMBER,
					metadata: {
						added: currentRoles
							.filter((r) => added.includes(r.roleId))
							.map((r) => ({
								id: r.roleId,
								name: r.role.name,
							})),
						removed: currentRoles
							.filter((r) => removed.includes(r.roleId))
							.map((r) => ({
								id: r.roleId,
								name: r.role.name,
							})),
						targetName:
							member.displayName ||
							member.user.displayName ||
							member.user.username,
					},
				},
				tx,
			);
		}
	}

	private async syncPermissions(
		tx: Prisma.TransactionClient,
		member: MemberWithUser,
		newPermissions: string[],
		authUserId: string,
	) {
		const oldPermissions = member.permissions || [];

		const added = newPermissions.filter((p) => !oldPermissions.includes(p));
		const removed = oldPermissions.filter((p) => !newPermissions.includes(p));

		if (added.length || removed.length) {
			await tx.workspaceMember.update({
				where: { id: member.id },
				data: { permissions: newPermissions },
			});

			await this.auditLogService.createAuditLog(
				{
					workspaceId: member.workspaceId,
					userId: authUserId,
					actionKey: ACTION_KEYS.WORKSPACE_MEMBER.PERMISSION_UPDATED,
					entityId: member.id,
					entityType: EntityType.WORKSPACE_MEMBER,
					metadata: {
						added,
						removed,
						targetName: member.user.displayName || member.user.username,
					},
					actorName: member.user.displayName || member.user.username,
				},
				tx,
			);
		}
	}
}
