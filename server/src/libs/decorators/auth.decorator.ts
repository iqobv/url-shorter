import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserRole } from 'generated/prisma/enums';
import { Roles } from 'src/api/public/auth/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/api/public/auth/guards';

export function Auth(...roles: UserRole[]) {
	if (roles.length > 0) {
		return applyDecorators(
			Roles(...roles),
			UseGuards(JwtAuthGuard, RolesGuard),
			ApiCookieAuth(),
			ApiUnauthorizedResponse({ description: 'Unauthorized' }),
		);
	}
	return applyDecorators(
		UseGuards(JwtAuthGuard),
		ApiCookieAuth(),
		ApiUnauthorizedResponse({ description: 'Unauthorized' }),
	);
}
