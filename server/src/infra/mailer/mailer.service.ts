import { getMailerConfig } from '@config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import Mail from 'nodemailer/lib/mailer';
import { SendEmailDto } from './dto';
import VerificationEmailTemplate from './templates/verification-email.template';

@Injectable()
export class MailerService {
	private readonly transport: ReturnType<typeof getMailerConfig>;

	constructor(private readonly configService: ConfigService) {
		this.transport = getMailerConfig(configService);
	}

	async sendVerificationEmail(email: string, token: string) {
		const domain = this.configService.getOrThrow<string>('MAIL_DOMAIN');
		const linkBase = this.configService.getOrThrow<string>('MAIL_LINK_BASE');

		const url = `${domain}${linkBase}${token}`;

		const html = await render(VerificationEmailTemplate({ url }));

		return this.sendMail({
			recipients: [email],
			subject: 'Please verify your email address',
			html,
		});
	}

	async sendMail(dto: SendEmailDto) {
		const { from, recipients, subject, html } = dto;

		const options: Mail.Options = {
			from:
				from ??
				`"${this.configService.getOrThrow<string>('MAIL_FROM_NAME')}" <${this.configService.getOrThrow<string>('MAIL_FROM_ADDRESS')}>`,
			to: [...recipients],
			subject,
			html,
		};

		try {
			const result = await this.transport.sendMail(options);

			return result;
		} catch (error) {
			console.log('error', error);
		}
	}
}
