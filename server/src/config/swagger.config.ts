import { DocumentBuilder } from '@nestjs/swagger';

export const getSwaggerConfig = () => {
	return new DocumentBuilder()
		.setTitle('URL Shortener API')
		.setDescription('URL Shortener API description')
		.setVersion('1.0.0')
		.addBearerAuth()
		.build();
};
