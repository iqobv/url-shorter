import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { EmailResultDto, ResendEmailDto } from './dto';
import { EmailConfirmationService } from './email-confirmation.service';

@ApiTags('Auth - Email Confirmation')
@Controller('auth/email-confirmation')
export class EmailConfirmationController {
	constructor(
		private readonly emailConfirmationService: EmailConfirmationService,
	) {}

	@ApiOperation({
		summary: 'Verify Email',
		description: 'Verify user email using the provided token',
	})
	@ApiOkResponse({
		description: 'Email verified successfully',
		type: EmailResultDto,
	})
	@Get('verify/:token')
	async verifyEmail(
		@Param('token') token: string,
		@Res({ passthrough: true }) res: Response,
	) {
		return await this.emailConfirmationService.verifyEmail(token, res);
	}

	@ApiOperation({
		summary: 'Resend Verification Email',
		description: 'Resend verification email to the specified email address',
	})
	@ApiOkResponse({
		description:
			'If a matching account was found, a verification email has been sent.',
		type: EmailResultDto,
	})
	@Post('resend')
	async resendVerificationEmail(@Body() dto: ResendEmailDto) {
		return await this.emailConfirmationService.resendVerificationEmail(dto);
	}
}
