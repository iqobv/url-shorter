import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import basicAuth from 'express-basic-auth';
import { AdminModule } from './api/admin/admin.module';
import { PublicModule } from './api/public/public.module';
import { AppModule } from './app.module';
import {
	getAdminSwaggerConfig,
	getApiVersioningConfig,
	getCorsConfig,
	getPublicSwaggerConfig,
	getValidationPipeConfig,
} from './config';
import { setupSwagger } from './libs/utils';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const config = app.get(ConfigService);

	app.use(cookieParser());

	app.set('trust proxy', true);

	app.enableCors(getCorsConfig(config));
	app.useGlobalPipes(getValidationPipeConfig());
	app.enableVersioning(getApiVersioningConfig());

	app.use(
		'/docs-admin',
		basicAuth({
			users: {
				[config.getOrThrow<string>('ADMIN_DOCS_USER')]:
					config.getOrThrow<string>('ADMIN_DOCS_PASSWORD'),
			},
			challenge: true,
		}),
	);

	setupSwagger({
		app,
		config: getPublicSwaggerConfig(),
		path: '/docs',
		include: [PublicModule],
		options: {
			customSiteTitle: 'URL Shorter API Docs',
		},
	});

	setupSwagger({
		app,
		config: getAdminSwaggerConfig(),
		path: '/docs-admin',
		include: [AdminModule],
		options: {
			customSiteTitle: 'URL Shorter Admin API Docs',
		},
	});

	await app.listen(process.env.PORT ?? 5000);
}

bootstrap().catch((err) => {
	console.error('Error during app bootstrap:', err);
	process.exit(1);
});
