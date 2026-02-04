import {
	Body,
	Controller,
	Get,
	Ip,
	Param,
	Post,
	Req,
	Res,
} from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { Auth, Authorized, OptionalAuth } from 'src/libs/decorators';
import { BulkClaimLinksDto, CreateLinkDto, LinkDto } from './dto';
import { LinkService } from './link.service';

@Controller('links')
export class LinkController {
	constructor(private readonly linkService: LinkService) {}

	@ApiOperation({ summary: 'Create a short link' })
	@OptionalAuth()
	@ApiOkResponse({ type: LinkDto })
	@ApiConflictResponse({ description: 'Custom alias is already in use.' })
	@ApiForbiddenResponse({
		description: 'Custom alias can only be set by authenticated users.',
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

	@ApiOperation({ summary: 'Redirect to original URL by slug' })
	@ApiOkResponse({ description: 'Redirects to the original URL' })
	@ApiNotFoundResponse({ description: 'Link not found.' })
	@Get('slug/:slug')
	async getBySlug(
		@Ip() ip: string,
		@Param('slug') slug: string,
		@Res() res: Response,
		@Req() req: Request,
	) {
		const userAgent = req.get('user-agent') || '';
		const referer = req.get('referer') || '';

		const link = await this.linkService.getBySlug(slug, {
			ip,
			userAgent,
			referer,
		});

		return res.redirect(link.originalUrl);
	}

	@Auth()
	@ApiOperation({ summary: 'Get all links for the authenticated user' })
	@ApiOkResponse({ type: [LinkDto] })
	@Get('me')
	async getUserLinks(@Authorized('id') userId: string) {
		return await this.linkService.getUserLinks(userId);
	}
}
