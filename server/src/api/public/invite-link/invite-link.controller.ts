import { ERRORS, PERMISSIONS } from '@libs/constants';
import { Auth, Authorized, Permissions } from '@libs/decorators';
import { createCustomMessageDto } from '@libs/utils';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import {
	CreateInviteLinkDto,
	InviteLinkDto,
	InviteLinkUsedResponseDto,
} from './dto';
import { InviteLinkService } from './invite-link.service';

@ApiTags('Invite Links')
@Controller('invite-links')
export class InviteLinkController {
	constructor(private readonly inviteLinkService: InviteLinkService) {}

	@Permissions(PERMISSIONS.INVITE.CREATE_LINK)
	@ApiOperation({ summary: 'Create an invite link for a workspace' })
	@ApiOkResponse({ type: InviteLinkDto })
	@ApiForbiddenResponse({
		type: createCustomMessageDto(ERRORS.WORKSPACE.PERSONAL_WORKSPACE),
	})
	@ApiNotFoundResponse({
		type: createCustomMessageDto(
			ERRORS.WORKSPACE.WORKSPACE_NOT_FOUND_OR_NO_PERMISSION,
		),
	})
	@Post('create')
	async createInviteLink(
		@Authorized('id') userId: string,
		@Body() dto: CreateInviteLinkDto,
	) {
		return await this.inviteLinkService.createInviteLink(userId, dto);
	}

	@Permissions(PERMISSIONS.INVITE.VIEW_LINKS_ALL)
	@ApiOperation({ summary: 'Get all invite links for a workspace' })
	@ApiOkResponse({ type: [InviteLinkDto] })
	@Get('workspace/:workspaceId')
	async getInviteLinks(
		@Authorized('id') userId: string,
		@Param('workspaceId') workspaceId: string,
	) {
		return await this.inviteLinkService.getInviteLinks(workspaceId, userId);
	}

	@Auth()
	@ApiOperation({ summary: 'Use an invite link' })
	@ApiOkResponse({ type: InviteLinkUsedResponseDto })
	@Get('use/:code')
	async useInviteLink(
		@Param('code') code: string,
		@Authorized('id') userId: string,
	) {
		return await this.inviteLinkService.useInviteLink(code, userId);
	}
}
