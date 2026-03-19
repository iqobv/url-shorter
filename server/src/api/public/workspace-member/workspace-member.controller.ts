import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PERMISSIONS } from 'src/libs/constants';
import { Authorized, Permissions } from 'src/libs/decorators';
import { UpdateWorkspaceMemberDto, WorkspaceMembersDto } from './dto';
import { WorkspaceMemberService } from './workspace-member.service';

@ApiTags('Workspace Members')
@Controller('workspace-members')
export class WorkspaceMemberController {
	constructor(
		private readonly workspaceMemberService: WorkspaceMemberService,
	) {}

	@Permissions(PERMISSIONS.MEMBERS.VIEW)
	@ApiOperation({ summary: 'Get workspace members' })
	@ApiOkResponse({ type: [WorkspaceMembersDto] })
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
	@Get('workspace/:workspaceId/member/:memberId')
	async getWorkspaceMember(
		@Param('workspaceId') workspaceId: string,
		@Param('memberId') memberId: string,
		@Authorized('id') authUserId: string,
	) {
		return await this.workspaceMemberService.getWorkspaceMember(
			workspaceId,
			memberId,
			authUserId,
		);
	}

	@Permissions()
	@ApiOperation({ summary: 'Get workspace member permissions' })
	@Get('workspace/:workspaceId/my-permissions')
	async getWorkspaceMemberPermissions(
		@Param('workspaceId') workspaceId: string,
		@Authorized('id') userId: string,
	) {
		return await this.workspaceMemberService.getWorkspaceMemberPermissions(
			workspaceId,
			userId,
		);
	}

	@Permissions(PERMISSIONS.MEMBERS.EDIT)
	@ApiOperation({ summary: 'Update workspace member' })
	@Patch('workspace/:workspaceId/member/:memberId')
	async updateWorkspaceMember(
		@Param('workspaceId') workspaceId: string,
		@Param('memberId') memberId: string,
		@Authorized('id') authUserId: string,
		@Body() dto: UpdateWorkspaceMemberDto,
	) {
		return await this.workspaceMemberService.updateWorkspaceMember(
			workspaceId,
			memberId,
			authUserId,
			dto,
		);
	}

	@Permissions(PERMISSIONS.MEMBERS.REMOVE)
	@ApiOperation({ summary: 'Remove workspace member' })
	@Delete('workspace/:workspaceId/member/:memberId')
	async deleteWorkspaceMember(
		@Param('workspaceId') workspaceId: string,
		@Param('memberId') memberId: string,
		@Authorized('id') authUserId: string,
	) {
		return await this.workspaceMemberService.deleteWorkspaceMember(
			workspaceId,
			memberId,
			authUserId,
		);
	}
}
