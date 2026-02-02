import { Controller, Get, Req, Res } from '@nestjs/common';
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
	) {
		const user = req.user as User;
		const session = await this.oauthService.login(user, res);

		res.send(`
			<script>
				window.opener.postMessage(
					{
						user: ${JSON.stringify(session.user)}
					},
					'${process.env.GOOGLE_REDIRECT_ORIGIN}'
				);
				window.close();
			</script>
		`);
	}
}
