import { TokenType } from '@generated/prisma/enums';
import { MailerService } from '@infra/mailer/mailer.service';
import { ERRORS, SUCCESS_MESSAGES } from '@libs/constants';
import {
	BadRequestException,
	forwardRef,
	Inject,
	Injectable,
} from '@nestjs/common';
import type { Response } from 'express';
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
			throw new BadRequestException(ERRORS.EMAIL_CONFIRMATION.INVALID_TOKEN);
		}

		await this.userService.updateUser(tokenRecord.user.id, {
			emailVerified: true,
		});
		const user = await this.userService.findById(tokenRecord.user.id);

		await this.authService.createSession(user, res);

		return SUCCESS_MESSAGES.EMAIL_CONFIRMATION.EMAIL_CONFIRMED;
	}

	async resendVerificationEmail(dto: ResendEmailDto) {
		const { email } = dto;

		const user = await this.userService.findByEmail(email);

		if (user && !user.emailVerified) {
			const token = await this.authService.createVerifyEmailToken(user.id);
			await this.mailerService.sendVerificationEmail(user.email, token);
		}

		return SUCCESS_MESSAGES.EMAIL_CONFIRMATION.EMAIL_RESENT;
	}
}
