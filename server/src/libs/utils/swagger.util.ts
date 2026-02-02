import { INestApplication } from '@nestjs/common';
import {
	OpenAPIObject,
	SwaggerCustomOptions,
	SwaggerDocumentOptions,
	SwaggerModule,
} from '@nestjs/swagger';

interface SetupSwaggerParams {
	app: INestApplication;
	config: Omit<OpenAPIObject, 'paths'>;
	include?: SwaggerDocumentOptions['include'];
	path: string;
	options?: SwaggerCustomOptions;
}

export const setupSwagger = ({
	app,
	config,
	include,
	path,
	options,
}: SetupSwaggerParams) => {
	const documentFactory = () =>
		SwaggerModule.createDocument(app, config, {
			include,
			deepScanRoutes: true,
		});
	SwaggerModule.setup(path, app, documentFactory, {
		jsonDocumentUrl: options?.jsonDocumentUrl || `${path}/json`,
		yamlDocumentUrl: options?.yamlDocumentUrl || `${path}/yaml`,
		customSiteTitle: options?.customSiteTitle || config.info.title,
		...options,
	});
};
