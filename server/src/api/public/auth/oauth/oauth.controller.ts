import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { User } from 'generated/prisma/client';
import { GoogleAuth } from '../decorators';
import { OauthService } from './oauth.service';

@ApiTags('OAuth')
@Controller('oauth')
export class OauthController {
	constructor(private readonly oauthService: OauthService) {}

	@ApiOperation({
		summary: 'Authenticate with Google OAuth',
	})
	@Get('google')
	@GoogleAuth()
	async googleAuth() {}

	@ApiExcludeEndpoint()
	@Get('google/callback')
	@GoogleAuth()
	async googleAuthCallback(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
		@Query('state') state: string,
	) {
		const user = req.user as User;
		await this.oauthService.login(user, res);

		const frontendOrigin = process.env.CLIENT_URL || 'http://localhost:3000';

		const redirectUrl = new URL(state || '/', frontendOrigin).toString();

		return res.redirect(redirectUrl);
	}
}
