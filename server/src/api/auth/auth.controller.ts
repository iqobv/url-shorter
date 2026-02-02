import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { Auth, Authorized } from 'src/libs/decorators';
import { UserSwaggerDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import {
	LoginDto,
	LoginResultDto,
	RegisterDto,
	RegisterResultDto,
} from './dto';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
	) {}

	@ApiOperation({ summary: 'Register a new user' })
	@ApiOkResponse({ type: RegisterResultDto })
	@ApiConflictResponse({
		description: 'User with this email already exists',
	})
	@Post('register')
	async register(@Body() dto: RegisterDto) {
		return await this.authService.register(dto);
	}

	@ApiOperation({ summary: 'Login user and create session' })
	@ApiOkResponse({ type: LoginResultDto })
	@ApiForbiddenResponse({ description: 'Email not verified' })
	@Post('login')
	async login(
		@Body() dto: LoginDto,
		@Res({ passthrough: true }) res: Response,
	) {
		return await this.authService.login(dto, res);
	}

	@ApiOperation({ summary: 'Logout user and delete session' })
	@Auth()
	@ApiOkResponse({ type: Boolean })
	@Post('logout')
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		return await this.authService.logout(req, res);
	}

	@ApiOperation({ summary: 'Refresh access and refresh tokens' })
	@ApiOkResponse({ type: LoginResultDto })
	@ApiUnauthorizedResponse({
		description: 'No refresh token provided<br/>Invalid refresh token',
	})
	@ApiNotFoundResponse({ description: 'User not found' })
	@Post('refresh')
	async refreshToken(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		return await this.authService.refreshTokens(req, res);
	}

	@Auth()
	@ApiOperation({ summary: 'Get current logged in user' })
	@ApiOkResponse({ type: UserSwaggerDto })
	@ApiNotFoundResponse({ description: 'User not found' })
	@Get('me')
	async me(@Authorized('id') userId: string) {
		return await this.userService.findById(userId);
	}
}
