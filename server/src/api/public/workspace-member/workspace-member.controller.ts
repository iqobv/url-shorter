import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PERMISSIONS } from 'src/libs/constants';
import { Authorized, Permissions } from 'src/libs/decorators';
import { UpdateWorkspaceMemberDto } from './dto';
import { WorkspaceMemberService } from './workspace-member.service';

@ApiTags('Workspace Members')
@Controller('workspace-members')
export class WorkspaceMemberController {
	constructor(
		private readonly workspaceMemberService: WorkspaceMemberService,
	) {}

	@Permissions(PERMISSIONS.MEMBERS.VIEW)
	@ApiOperation({ summary: 'Get workspace members' })
	@Get('workspace/:workspaceId')
	async getWorkspaceMembers(
		@Param('workspaceId') workspaceId: string,
		@Authorized('id') userId: string,
	) {
		return await this.workspaceMemberService.getWorkspaceMembers(
			workspaceId,
			userId,
		);
	}

	@Permissions(PERMISSIONS.MEMBERS.VIEW)
	@ApiOperation({ summary: 'Get workspace member' })
	@Get('workspace/:workspaceId/user/:userId')
	async getWorkspaceMember(
		@Param('workspaceId') workspaceId: string,
		@Param('userId') userId: string,
		@Authorized('id') authUserId: string,
	) {
		return await this.workspaceMemberService.getWorkspaceMember(
			workspaceId,
			userId,
			authUserId,
		);
	}

	@Permissions(PERMISSIONS.MEMBERS.EDIT)
	@ApiOperation({ summary: 'Update workspace member' })
	@Patch('workspace/:workspaceId/user/:userId')
	async updateWorkspaceMember(
		@Param('workspaceId') workspaceId: string,
		@Param('userId') userId: string,
		@Authorized('id') authUserId: string,
		@Body() dto: UpdateWorkspaceMemberDto,
	) {
		return await this.workspaceMemberService.updateWorkspaceMember(
			workspaceId,
			userId,
			authUserId,
			dto,
		);
	}

	@Permissions(PERMISSIONS.MEMBERS.REMOVE)
	@ApiOperation({ summary: 'Remove workspace member' })
	@Delete('workspace/:workspaceId/user/:userId')
	async deleteWorkspaceMember(
		@Param('workspaceId') workspaceId: string,
		@Param('userId') userId: string,
		@Authorized('id') authUserId: string,
	) {
		return await this.workspaceMemberService.deleteWorkspaceMember(
			workspaceId,
			userId,
			authUserId,
		);
	}
}
