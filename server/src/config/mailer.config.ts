import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

export const getMailerConfig = (configService: ConfigService) =>
	nodemailer.createTransport({
		host: configService.getOrThrow<string>('MAIL_HOST'),
		secure: false,
		port: configService.getOrThrow<number>('MAIL_PORT'),
		auth: {
			user: configService.getOrThrow<string>('MAIL_USER'),
			pass: configService.getOrThrow<string>('MAIL_PASSWORD'),
		},
	});
