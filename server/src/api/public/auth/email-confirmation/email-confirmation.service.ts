import {
	BadRequestException,
	forwardRef,
	Inject,
	Injectable,
} from '@nestjs/common';
import type { Response } from 'express';
import { TokenType } from 'generated/prisma/enums';
import { MailerService } from 'src/infra/mailer/mailer.service';
import { TokenService } from '../../token/token.service';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { ResendEmailDto } from './dto';

@Injectable()
export class EmailConfirmationService {
	constructor(
		private readonly tokenService: TokenService,
		private readonly userService: UserService,
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
		private readonly mailerService: MailerService,
	) {}

	async verifyEmail(token: string, res: Response) {
		const tokenRecord = await this.tokenService.getByToken(
			token,
			TokenType.VERIFY_EMAIL,
		);

		if (!tokenRecord) {
			throw new BadRequestException('Invalid or expired token');
		}

		await this.userService.updateUser(tokenRecord.user.id, {
			emailVerified: true,
		});
		const user = await this.userService.findById(tokenRecord.user.id);

		await this.authService.createSession(user, res);

		return { message: 'Email verified successfully' };
	}

	async resendVerificationEmail(dto: ResendEmailDto) {
		const { email } = dto;

		const user = await this.userService.findByEmail(email);

		if (user && !user.emailVerified) {
			const token = await this.authService.createVerifyEmailToken(user.id);
			await this.mailerService.sendVerificationEmail(user.email, token);
		}

		return {
			message:
				'If a matching account was found, a verification email has been sent.',
		};
	}
}
