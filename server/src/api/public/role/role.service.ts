import {
	ConflictException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { EntityType } from 'generated/prisma/enums';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import {
	ACTION_KEYS,
	ERRORS,
	PERMISSIONS,
	SUCCESS_MESSAGES,
} from 'src/libs/constants';
import { getDiff } from 'src/libs/utils';
import { AuditLogService } from '../audit-log/audit-log.service';
import { WorkspaceCommonService } from '../workspace-common/workspace-common.service';
import { CreateRoleDto, UpdateRoleDto } from './dto';

@Injectable()
export class RoleService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly workspaceCommonService: WorkspaceCommonService,
		private readonly auditLogService: AuditLogService,
	) {}

	async createRole(
		workspaceId: string,
		authUserId: string,
		dto: CreateRoleDto,
		tx?: Prisma.TransactionClient,
	) {
		const { name, permissions, description } = dto;

		const workspace = await this.workspaceCommonService.getWorkspace(
			workspaceId,
			authUserId,
		);

		if (
			authUserId !== workspace.ownerId &&
			permissions.includes(PERMISSIONS.ADMIN.ALL)
		)
			throw new ForbiddenException(
				ERRORS.ROLE.NO_PERMISSION_TO_ADD_ADMIN_PERMISSIONS,
			);

		const execute = async (client: Prisma.TransactionClient) => {
			const role = await client.role.create({
				data: {
					name,
					description,
					permissions,
					workspace: { connect: { id: workspace.id } },
				},
			});

			await this.auditLogService.createAuditLog(
				{
					workspaceId: workspace.id,
					userId: authUserId,
					actionKey: ACTION_KEYS.ROLE.CREATED,
					metadata: { roleName: role.name },
					entityId: role.id,
					entityType: EntityType.ROLE,
				},
				client,
			);

			return role;
		};

		return tx
			? await execute(tx)
			: await this.prismaService.$transaction(execute);
	}

	async createInitialRole(
		workspaceId: string,
		dto: CreateRoleDto,
		tx: Prisma.TransactionClient,
	) {
		return await tx.role.create({
			data: {
				name: dto.name,
				permissions: dto.permissions,
				workspace: { connect: { id: workspaceId } },
			},
		});
	}

	async getAllRoles(workspaceId: string, authUserId: string) {
		const workspace = await this.workspaceCommonService.getWorkspace(
			workspaceId,
			authUserId,
		);

		const roles = await this.prismaService.role.findMany({
			where: { workspaceId: workspace.id },
		});

		return roles;
	}

	async getRoleById(roleId: string, workspaceId: string, authUserId: string) {
		const workspace = await this.workspaceCommonService.getWorkspace(
			workspaceId,
			authUserId,
		);

		const role = await this.prismaService.role.findFirst({
			where: { id: roleId, workspaceId: workspace.id },
			include: { memberRoles: { include: { member: true } } },
		});

		if (!role) throw new NotFoundException(ERRORS.ROLE.ROLE_NOT_FOUND);

		return role;
	}

	async updateRole(
		roleId: string,
		workspaceId: string,
		authUserId: string,
		dto: UpdateRoleDto,
	) {
		const { name, description, permissions } = dto;

		const { workspace, role } = await this.getWorkspaceAndRole(
			workspaceId,
			authUserId,
			roleId,
		);

		if (permissions && permissions.includes(PERMISSIONS.ADMIN.ALL)) {
			if (authUserId !== workspace.ownerId)
				throw new ForbiddenException(
					ERRORS.ROLE.NO_PERMISSION_TO_ADD_ADMIN_PERMISSIONS,
				);
		}

		return await this.prismaService.$transaction(async (tx) => {
			const updatedRole = await tx.role.update({
				where: { id: role.id, workspaceId: workspace.id, deletedAt: null },
				data: {
					name,
					description,
					permissions,
				},
			});

			await this.auditLogService.createAuditLog(
				{
					workspaceId: workspace.id,
					userId: authUserId,
					actionKey: ACTION_KEYS.ROLE.EDITED,
					metadata: {
						roleName: updatedRole.name,
						changes: getDiff(role, {
							name: updatedRole.name,
							description: updatedRole.description,
							permissions: updatedRole.permissions,
						}),
					},
					entityId: role.id,
					entityType: EntityType.ROLE,
				},
				tx,
			);

			return updatedRole;
		});
	}

	async deleteRole(roleId: string, workspaceId: string, authUserId: string) {
		const { workspace, role } = await this.getWorkspaceAndRole(
			workspaceId,
			authUserId,
			roleId,
		);

		if (role.memberRoles.length > 0)
			throw new ConflictException(
				ERRORS.ROLE.CANNOT_DELETE_ROLE_ASSIGNED_TO_MEMBERS,
			);

		await this.prismaService.$transaction(async (tx) => {
			const deletedRole = await tx.role.update({
				where: { id: role.id, workspaceId: workspace.id, deletedAt: null },
				data: { deletedAt: new Date() },
			});

			await this.auditLogService.createAuditLog(
				{
					workspaceId: workspace.id,
					userId: authUserId,
					actionKey: ACTION_KEYS.ROLE.DELETED,
					metadata: { roleName: deletedRole.name },
					entityId: role.id,
					entityType: EntityType.ROLE,
				},
				tx,
			);
		});

		return SUCCESS_MESSAGES.ROLE.ROLE_DELETED;
	}

	private async getWorkspaceAndRole(
		workspaceId: string,
		authUserId: string,
		roleId: string,
	) {
		const workspace = await this.workspaceCommonService.getWorkspace(
			workspaceId,
			authUserId,
		);

		const role = await this.getRoleById(roleId, workspace.id, authUserId);

		return { workspace, role };
	}
}
