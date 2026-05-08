import { ERRORS, PERMISSIONS, SUCCESS_MESSAGES } from '@libs/constants';
import { Auth, Authorized, Permissions } from '@libs/decorators';
import { createCustomMessageDto } from '@libs/utils';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { WorkspaceCommonService } from '../workspace-common/workspace-common.service';
import { CreateWorkspaceDto, UpdateWorkspaceDto, WorkspaceDto } from './dto';
import { WorkspaceService } from './workspace.service';

@Controller('workspaces')
export class WorkspaceController {
	constructor(
		private readonly workspaceService: WorkspaceService,
		private readonly workspaceCommonService: WorkspaceCommonService,
	) {}

	@ApiOperation({ summary: 'Create a new workspace' })
	@Auth()
	@ApiCreatedResponse({ type: WorkspaceDto })
	@Post()
	async createWorkspace(
		@Authorized('id') userId: string,
		@Body() dto: CreateWorkspaceDto,
	) {
		return this.workspaceService.createWorkspace(userId, dto);
	}

	@ApiOperation({ summary: 'Update an existing workspace' })
	@Auth()
	@ApiOkResponse({ type: WorkspaceDto })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(
			ERRORS.WORKSPACE.WORKSPACE_NOT_FOUND_OR_NO_PERMISSION,
		),
	})
	@Patch(':id')
	async updateWorkspace(
		@Authorized('id') userId: string,
		@Param('id') workspaceId: string,
		@Body() dto: UpdateWorkspaceDto,
	) {
		return this.workspaceService.updateWorkspace(workspaceId, userId, dto);
	}

	@ApiOperation({ summary: 'Get user default workspace' })
	@Auth()
	@Get('default')
	async getDefaultWorkspace(@Authorized('id') userId: string) {
		return this.workspaceService.getDefaultWorkspace(userId);
	}

	@ApiOperation({ summary: 'Get user workspaces' })
	@Auth()
	@Get('me')
	async getUserWorkspaces(@Authorized('id') userId: string) {
		return this.workspaceService.getUserWorkspaces(userId);
	}

	@Auth()
	@Permissions()
	@ApiOperation({ summary: 'Get workspace by ID' })
	@ApiOkResponse({ type: WorkspaceDto })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(
			ERRORS.WORKSPACE.WORKSPACE_NOT_FOUND_OR_NO_PERMISSION,
		),
	})
	@Get('id/:workspaceId')
	async getWorkspaceById(
		@Authorized('id') userId: string,
		@Param('workspaceId') workspaceId: string,
	) {
		return this.workspaceService.getWorkspaceById(workspaceId, userId);
	}

	@ApiOperation({ summary: 'Get all workspace permissions' })
	@Get('permissions')
	getAllPermissions() {
		return PERMISSIONS;
	}

	@ApiOperation({ summary: 'Delete a workspace' })
	@Permissions(PERMISSIONS.WORKSPACE.DELETE)
	@ApiOkResponse({
		type: createCustomMessageDto(SUCCESS_MESSAGES.WORKSPACE.WORKSPACE_DELETED),
	})
	@ApiNotFoundResponse({
		type: createCustomMessageDto(
			ERRORS.WORKSPACE.WORKSPACE_NOT_FOUND_OR_NO_PERMISSION,
		),
	})
	@Delete(':id')
	async deleteWorkspace(
		@Authorized('id') userId: string,
		@Param('id') workspaceId: string,
	) {
		return this.workspaceService.deleteWorkspace(workspaceId, userId);
	}
}
