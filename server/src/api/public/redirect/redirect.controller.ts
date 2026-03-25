import {
	Controller,
	Get,
	Ip,
	Param,
	Req,
	Res,
	UseGuards,
	VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { DomainGuard } from 'src/libs/guards';
import { LinkService } from '../link/link.service';

@ApiExcludeController()
@Controller({
	version: VERSION_NEUTRAL,
})
@UseGuards(new DomainGuard(['short']))
export class RedirectController {
	constructor(private readonly linkService: LinkService) {}

	@Get(':slug')
	async redirect(
		@Param('slug') slug: string,
		@Ip() ip: string,
		@Req() req: Request,
		@Res() res: Response,
	) {
		const userAgent = req.get('user-agent') || '';
		const referer = req.get('referer') || '';

		const link = await this.linkService.getBySlug(slug, {
			ip,
			userAgent,
			referer,
		});

		return res.redirect(302, link.originalUrl);
	}
}
