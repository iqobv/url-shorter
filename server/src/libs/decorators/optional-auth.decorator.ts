import { applyDecorators, UseGuards } from '@nestjs/common';
import { OptionalJwtAuthGuard } from 'src/api/public/auth/guards';

export function OptionalAuth() {
	return applyDecorators(UseGuards(OptionalJwtAuthGuard));
}
