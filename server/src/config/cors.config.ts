import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

export const getCorsConfig = (configService: ConfigService): CorsOptions => ({
	origin: configService
		.getOrThrow<string>('ALLOWED_ORIGIN')
		.split(',')
		.map((url) => url.trim()),
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
	allowedHeaders: [
		'Content-Type',
		'Authorization',
		'X-Requested-With',
		'Accept',
		'Origin',
		'Access-Control-Allow-Origin',
		'Access-Control-Allow-Credentials',
	],
	preflightContinue: false,
	optionsSuccessStatus: 204,
});
