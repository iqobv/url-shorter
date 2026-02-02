import { basicSwaggerConfig } from './basic-swagger.config';

export const getAdminSwaggerConfig = () =>
	basicSwaggerConfig(
		'URL Shortener Admin API',
		'API documentation for "URL Shortener" admin endpoints',
		'1.0.0',
	).build();
