import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';
import ms from 'ms';

import { isDev, parseBoolean } from 'src/libs/utils';

export const getCookieConfig = (
	config: ConfigService,
	maxAge: ms.StringValue,
): CookieOptions => {
	return {
		domain: isDev(config)
			? undefined
			: config.getOrThrow<string>('COOKIE_DOMAIN'),
		maxAge: ms(maxAge),
		httpOnly: isDev(config)
			? false
			: parseBoolean(config.getOrThrow<string>('COOKIE_HTTP_ONLY')),
		secure: isDev(config)
			? false
			: parseBoolean(config.getOrThrow<string>('COOKIE_SECURE')),
		sameSite: config.getOrThrow<string>('COOKIE_SAME_SITE') as
			| 'lax'
			| 'strict'
			| 'none',
	};
};
