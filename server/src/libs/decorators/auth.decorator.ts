import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/auth/guards';

export function Auth() {
	return applyDecorators(
		UseGuards(JwtAuthGuard),
		ApiCookieAuth(),
		ApiUnauthorizedResponse({ description: 'Unauthorized' }),
	);
}
