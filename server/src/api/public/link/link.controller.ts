import { ERRORS } from '@libs/constants';
import { Auth, Authorized, OptionalAuth, Permissions } from '@libs/decorators';
import { createCustomMessageDto } from '@libs/utils';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import {
	BulkClaimLinksDto,
	CreateLinkDto,
	GetAllLinksDto,
	LinkDto,
	PaginatedLinksDto,
} from './dto';
import { LinkService } from './link.service';

@Controller('links')
export class LinkController {
	constructor(private readonly linkService: LinkService) {}

	@ApiOperation({ summary: 'Create a short link' })
	@OptionalAuth()
	@ApiOkResponse({ type: LinkDto })
	@ApiConflictResponse({
		type: createCustomMessageDto(ERRORS.LINK.CUSTOM_ALIAS_ALREADY_EXISTS),
	})
	@ApiForbiddenResponse({
		type: createCustomMessageDto(ERRORS.LINK.CUSTOM_ALIAS_NOT_AUTHENTICATED),
	})
	@Post()
	async create(@Body() dto: CreateLinkDto, @Authorized('id') userId: string) {
		return await this.linkService.createShortLink(dto, userId);
	}

	@ApiOperation({ summary: 'Bulk claim links' })
	@Auth()
	@ApiForbiddenResponse({ description: `Invalid token for link {linkId}` })
	@Post('claim')
	async claimLinks(
		@Authorized('id') userId: string,
		@Body() dto: BulkClaimLinksDto,
	) {
		return await this.linkService.claimLinks(userId, dto);
	}

	@ApiOperation({ summary: 'Get link by slug' })
	@ApiOkResponse({ type: LinkDto })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERRORS.LINK.LINK_NOT_FOUND),
	})
	@Get('slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return await this.linkService.getBySlugWithoutTracking(slug);
	}

	@Permissions()
	@ApiOperation({ summary: 'Get all links for a workspace' })
	@ApiOkResponse({ type: PaginatedLinksDto })
	@Get('workspace/:workspaceId')
	async getWorkspaceLinks(
		@Param('workspaceId') workspaceId: string,
		@Query() query: GetAllLinksDto,
	) {
		return await this.linkService.getAllWorkspaceLinks(workspaceId, query);
	}

	@Auth()
	@ApiOperation({ summary: 'Get all links for the authenticated user' })
	@ApiOkResponse({ type: [PaginatedLinksDto] })
	@Get('me')
	async getUserLinks(
		@Authorized('id') userId: string,
		@Query() query: GetAllLinksDto,
	) {
		return await this.linkService.getUserLinks(userId, query);
	}
}
