import {
	ForbiddenException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Request, Response } from 'express';
import { User } from 'generated/prisma/client';
import { TokenType } from 'generated/prisma/enums';
import ms, { StringValue } from 'ms';
import { MailerService } from 'src/infra/mailer/mailer.service';
import { parseBoolean } from 'src/libs/utils';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
	private readonly ACCESS_TOKEN_SECRET: string;
	private readonly ACCESS_TOKEN_TTL: StringValue;
	private readonly REFRESH_TOKEN_TTL: StringValue;

	constructor(
		private readonly userService: UserService,
		private readonly tokenService: TokenService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
		private readonly mailerService: MailerService,
	) {
		this.ACCESS_TOKEN_SECRET = this.configService.getOrThrow<string>(
			'ACCESS_TOKEN_SECRET',
		);
		this.ACCESS_TOKEN_TTL =
			this.configService.getOrThrow<StringValue>('ACCESS_TOKEN_TTL');
		this.REFRESH_TOKEN_TTL =
			this.configService.getOrThrow<StringValue>('REFRESH_TOKEN_TTL');
	}

	async register(dto: RegisterDto) {
		const user = await this.userService.createUser({
			...dto,
			emailVerified: false,
		});

		const token = await this.createVerifyEmailToken(user.id);

		await this.mailerService.sendVerificationEmail(user.email, token);

		return { success: true, code: 'REGISTRATION_SUCCESS_CONFIRM_EMAIL' };
	}

	async login(dto: LoginDto, res: Response) {
		const user = await this.validateUser(dto);

		if (!user.emailVerified) {
			throw new ForbiddenException('Email not verified');
		}

		return await this.createSession(user, res);
	}

	async logout(req: Request, res: Response) {
		const token = req.cookies['refreshToken'] as string;
		const user = req.user as User;

		if (!token || !user) return;

		this.setTokensToCookies('', '', res, true);

		await this.tokenService.removeToken(user.id, token, TokenType.REFRESH);

		return true;
	}

	async createSession(user: User, res: Response) {
		const { accessToken, refreshToken } = await this.generateTokens(user.id);

		this.setTokensToCookies(accessToken, refreshToken, res, false);

		const { password, ...userData } = user;

		return { user: userData };
	}

	async validateUser(dto: LoginDto) {
		const user = await this.userService.findByEmail(dto.email, true);

		if (!user || !user.password) {
			throw new UnauthorizedException({
				message: 'Invalid email or password',
				code: 'INVALID_CREDENTIALS',
			});
		}

		const isPasswordValid = await this.userService.comparePassword(
			user.id,
			dto.password,
		);

		if (!isPasswordValid) {
			throw new UnauthorizedException({
				message: 'Invalid email or password',
				code: 'INVALID_CREDENTIALS',
			});
		}

		return user;
	}

	async refreshTokens(req: Request, res: Response) {
		const oldRefreshToken = req.cookies['refreshToken'] as string;

		if (!oldRefreshToken) {
			throw new UnauthorizedException('No refresh token provided');
		}

		const storedToken = await this.tokenService.getByToken(
			oldRefreshToken,
			TokenType.REFRESH,
		);

		if (!storedToken) {
			throw new UnauthorizedException('Invalid refresh token');
		}
		const user = await this.userService.findById(storedToken.userId);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		await this.tokenService.removeToken(
			user.id,
			oldRefreshToken,
			TokenType.REFRESH,
		);

		const { accessToken, refreshToken } = await this.generateTokens(user.id);

		this.setTokensToCookies(accessToken, refreshToken, res, false);

		return { user };
	}

	async createVerifyEmailToken(userId: string) {
		const expiresAt = new Date();
		expiresAt.setHours(expiresAt.getHours() + 1);

		const token = await this.tokenService.createToken(
			{
				userId,
				expiresAt,
				tokenType: TokenType.VERIFY_EMAIL,
			},
			true,
		);

		return token.token;
	}

	private setTokensToCookies(
		accessToken: string,
		refreshToken: string,
		res: Response,
		isRemove: boolean = false,
	) {
		this.setToCookie(
			'accessToken',
			accessToken,
			res,
			isRemove ? '0' : this.ACCESS_TOKEN_TTL,
		);
		this.setToCookie(
			'refreshToken',
			refreshToken,
			res,
			isRemove ? '0' : this.REFRESH_TOKEN_TTL,
		);
	}

	private setToCookie(
		name: string,
		value: string,
		res: Response,
		maxAge: StringValue,
	) {
		res.cookie(name, value, {
			httpOnly: true,
			secure: parseBoolean(
				this.configService.getOrThrow<string>('COOKIE_SECURE'),
			),
			sameSite: this.configService.getOrThrow<string>('COOKIE_SAME_SITE') as
				| 'lax'
				| 'strict'
				| 'none',
			maxAge: ms(maxAge),
		});
	}

	private async generateAccessToken(userId: string) {
		const accessToken = await this.jwtService.signAsync(
			{ sub: userId },
			{
				secret: this.ACCESS_TOKEN_SECRET,
				expiresIn: ms(this.ACCESS_TOKEN_TTL),
			},
		);

		return accessToken;
	}

	private async generateTokens(userId: string) {
		const accessToken = await this.generateAccessToken(userId);

		const expiresAt = ms(this.REFRESH_TOKEN_TTL);
		const refreshTokenExpiresAt = new Date(Date.now() + expiresAt);

		const refreshToken = await this.tokenService.createToken(
			{
				userId,
				expiresAt: refreshTokenExpiresAt,
				tokenType: TokenType.REFRESH,
			},
			false,
		);

		return { accessToken, refreshToken: refreshToken.token };
	}
}
