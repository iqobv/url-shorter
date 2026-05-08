import { Roles } from '@api/public/auth/decorators';
import { JwtAuthGuard, RolesGuard } from '@api/public/auth/guards';
import { UserRole } from '@generated/prisma/enums';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

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
