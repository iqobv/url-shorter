import { PERMISSIONS } from '@libs/constants';
import { Authorized, Permissions } from '@libs/decorators';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateRoleDto, RoleDto, UpdateRoleDto } from './dto';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Permissions(PERMISSIONS.ROLES.CREATE)
	@ApiOperation({ summary: 'Create a new role in the workspace' })
	@ApiOkResponse({ type: RoleDto })
	@Post('workspace/:workspaceId')
	async createRole(
		@Param('workspaceId') workspaceId: string,
		@Authorized('id') authUserId: string,
		@Body() dto: CreateRoleDto,
	) {
		return await this.roleService.createRole(workspaceId, authUserId, dto);
	}

	@Permissions(PERMISSIONS.ROLES.VIEW)
	@ApiOperation({ summary: 'Get all roles in the workspace' })
	@Get('workspace/:workspaceId')
	async getAllRoles(
		@Param('workspaceId') workspaceId: string,
		@Authorized('id') authUserId: string,
	) {
		return await this.roleService.getAllRoles(workspaceId, authUserId);
	}

	@Permissions(PERMISSIONS.ROLES.VIEW)
	@ApiOperation({ summary: 'Get a role by ID in the workspace' })
	@Get('workspace/:workspaceId/role/:roleId')
	async getRoleById(
		@Param('workspaceId') workspaceId: string,
		@Param('roleId') roleId: string,
		@Authorized('id') authUserId: string,
	) {
		return await this.roleService.getRoleById(roleId, workspaceId, authUserId);
	}

	@Permissions(PERMISSIONS.ROLES.EDIT)
	@ApiOperation({ summary: 'Update a role by ID in the workspace' })
	@Patch('workspace/:workspaceId/role/:roleId')
	async updateRole(
		@Param('workspaceId') workspaceId: string,
		@Param('roleId') roleId: string,
		@Authorized('id') authUserId: string,
		@Body() dto: UpdateRoleDto,
	) {
		return await this.roleService.updateRole(
			roleId,
			workspaceId,
			authUserId,
			dto,
		);
	}

	@Permissions(PERMISSIONS.ROLES.DELETE)
	@ApiOperation({ summary: 'Delete a role by ID in the workspace' })
	@Delete('workspace/:workspaceId/role/:roleId')
	async deleteRole(
		@Param('workspaceId') workspaceId: string,
		@Param('roleId') roleId: string,
		@Authorized('id') authUserId: string,
	) {
		return await this.roleService.deleteRole(roleId, workspaceId, authUserId);
	}
}
