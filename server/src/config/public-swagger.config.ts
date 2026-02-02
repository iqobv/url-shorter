import { basicSwaggerConfig } from './basic-swagger.config';

export const getPublicSwaggerConfig = () =>
	basicSwaggerConfig(
		'URL Shortener API',
		'API documentation for "URL Shortener" endpoints',
		'1.0.0',
	).build();
