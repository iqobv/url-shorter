import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityType } from 'generated/prisma/enums';
import { WorkspaceInclude, WorkspaceWhereInput } from 'generated/prisma/models';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import {
	ACTION_KEYS,
	ERRORS,
	PERMISSIONS,
	SUCCESS_MESSAGES,
} from 'src/libs/constants';
import { getDiff } from 'src/libs/utils';
import { AuditLogService } from '../audit-log/audit-log.service';
import { RoleService } from '../role/role.service';
import { WorkspaceMemberService } from '../workspace-member/workspace-member.service';
import { CreateWorkspaceDto, UpdateWorkspaceDto } from './dto';

@Injectable()
export class WorkspaceService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly roleService: RoleService,
		private readonly workspaceMemberService: WorkspaceMemberService,
		private readonly auditLogService: AuditLogService,
	) {}

	async createWorkspace(userId: string, dto: CreateWorkspaceDto) {
		const { name, isDefault = false, isPersonal = true } = dto;

		if (isDefault) {
			await this.prismaService.workspace.updateMany({
				where: {
					ownerId: userId,
					deletedAt: null,
					isDefault: true,
				},
				data: { isDefault: false },
			});
		}

		const allWorkspaces = await this.getAllWorkspacesByOwnerId(userId);

		return await this.prismaService.$transaction(async (tx) => {
			const workspace = await tx.workspace.create({
				data: {
					owner: { connect: { id: userId } },
					name,
					isDefault:
						!isDefault && allWorkspaces.length === 0 ? true : isDefault,
					isPersonal,
				},
			});

			if (workspace) {
				const role = await this.roleService.createInitialRole(
					workspace.id,
					{
						name: 'Owner',
						permissions: [PERMISSIONS.ADMIN.ALL],
					},
					tx,
				);

				await this.workspaceMemberService.createInitialWorkspaceMember(
					workspace.id,
					userId,
					role.id,
					tx,
				);

				return workspace;
			}
		});
	}

	async updateWorkspace(
		workspaceId: string,
		userId: string,
		dto: UpdateWorkspaceDto,
	) {
		const { name, isDefault, isPersonal } = dto;

		const workspace = await this.getWorkspaceByOwnerId(workspaceId, userId);

		return await this.prismaService.$transaction(async (tx) => {
			if (isDefault !== undefined && isDefault) {
				await tx.workspace.updateMany({
					where: {
						ownerId: userId,
						id: { not: workspace.id },
						deletedAt: null,
						isDefault: true,
					},
					data: { isDefault: false },
				});
			}

			const updatedWorkspace = await tx.workspace.update({
				where: { id: workspace.id },
				data: {
					name,
					isDefault,
					isPersonal,
				},
			});

			await this.auditLogService.createAuditLog(
				{
					workspaceId: workspace.id,
					userId,
					actionKey: ACTION_KEYS.WORKSPACE.EDITED,
					metadata: {
						name: updatedWorkspace.name,
						changes: getDiff(workspace, {
							name: updatedWorkspace.name,
							isDefault: updatedWorkspace.isDefault,
							isPersonal: updatedWorkspace.isPersonal,
						}),
					},
					entityId: workspace.id,
					entityType: EntityType.WORKSPACE,
				},
				tx,
			);

			return updatedWorkspace;
		});
	}

	async getUserWorkspaces(userId: string) {
		const workspaces = await this.prismaService.workspace.findMany({
			where: {
				OR: [
					{ ownerId: userId },
					{ members: { some: { userId, deletedAt: null } } },
				],
				deletedAt: null,
			},
		});

		const ownWorkspaces = workspaces.filter((w) => w.ownerId === userId);
		const sharedWorkspaces = workspaces.filter((w) => w.ownerId !== userId);

		return {
			own: ownWorkspaces,
			shared: sharedWorkspaces,
		};
	}

	async getDefaultWorkspace(userId: string) {
		const include: WorkspaceInclude = {
			links: true,
		};
		const where: WorkspaceWhereInput = {
			ownerId: userId,
			isDefault: true,
			deletedAt: null,
		};

		const workspace = await this.prismaService.workspace.findFirst({
			where,
			include,
		});

		if (!workspace) {
			const workspaces = await this.getUserWorkspaces(userId);
			if (workspaces.own.length > 0) {
				const firstOwnWorkspace = workspaces.own[0];

				return await this.prismaService.$transaction(async (tx) => {
					await this.prismaService.workspace.update({
						where: {
							id: firstOwnWorkspace.id,
							deletedAt: null,
							ownerId: userId,
						},
						data: { isDefault: true },
					});

					return await tx.workspace.findFirst({
						where,
						include,
					});
				});
			}

			throw new NotFoundException(ERRORS.WORKSPACE.DEFAULT_WORKSPACE_NOT_FOUND);
		}

		return workspace;
	}

	async getWorkspaceByOwnerId(workspaceId: string, userId: string) {
		const workspace = await this.prismaService.workspace.findFirst({
			where: {
				id: workspaceId,
				deletedAt: null,
				ownerId: userId,
			},
		});

		if (!workspace)
			throw new NotFoundException(
				ERRORS.WORKSPACE.WORKSPACE_NOT_FOUND_OR_NO_PERMISSION,
			);

		return workspace;
	}

	async getAllWorkspacesByOwnerId(ownerId: string) {
		return await this.prismaService.workspace.findMany({
			where: {
				ownerId,
				deletedAt: null,
			},
		});
	}

	async deleteWorkspace(workspaceId: string, userId: string) {
		const workspace = await this.getWorkspaceByOwnerId(workspaceId, userId);

		await this.prismaService.$transaction(async (tx) => {
			const deletedWorkspace = await this.prismaService.workspace.update({
				where: { id: workspace.id },
				data: {
					deletedAt: new Date(),
					members: {
						updateMany: {
							where: { deletedAt: null },
							data: { deletedAt: new Date() },
						},
					},
				},
			});

			await this.auditLogService.createAuditLog(
				{
					workspaceId: deletedWorkspace.id,
					userId,
					actionKey: ACTION_KEYS.WORKSPACE.DELETED,
					metadata: {
						name: deletedWorkspace.name,
					},
					entityId: deletedWorkspace.id,
					entityType: EntityType.WORKSPACE,
				},
				tx,
			);
		});

		return SUCCESS_MESSAGES.WORKSPACE.WORKSPACE_DELETED;
	}
}
