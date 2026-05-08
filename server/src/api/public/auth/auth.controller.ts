import { ERRORS } from '@libs/constants';
import { Auth, Authorized } from '@libs/decorators';
import { createCustomMessageDto } from '@libs/utils';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiExtraModels,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiUnauthorizedResponse,
	getSchemaPath,
} from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { UserSwaggerDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto, LoginResultDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
	) {}

	@ApiOperation({ summary: 'Register a new user' })
	@ApiOkResponse({
		type: createCustomMessageDto(
			ERRORS.AUTH.REGISTRATION_SUCCESS_CONFIRM_EMAIL,
		),
	})
	@ApiConflictResponse({
		type: createCustomMessageDto(ERRORS.USER.USER_ALREADY_EXISTS),
	})
	@Post('register')
	async register(@Body() dto: RegisterDto) {
		return await this.authService.register(dto);
	}

	@ApiOperation({ summary: 'Login user and create session' })
	@ApiOkResponse({ type: LoginResultDto })
	@ApiForbiddenResponse({
		type: createCustomMessageDto(ERRORS.AUTH.EMAIL_NOT_VERIFIED),
	})
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
	@ApiExtraModels(
		createCustomMessageDto(ERRORS.AUTH.NO_REFRESH_TOKEN),
		createCustomMessageDto(ERRORS.AUTH.INVALID_REFRESH_TOKEN),
	)
	@ApiUnauthorizedResponse({
		description: 'No refresh token or invalid refresh token',
		schema: {
			oneOf: [
				{
					$ref: getSchemaPath(
						createCustomMessageDto(ERRORS.AUTH.NO_REFRESH_TOKEN),
					),
				},
				{
					$ref: getSchemaPath(
						createCustomMessageDto(ERRORS.AUTH.INVALID_REFRESH_TOKEN),
					),
				},
			],
		},
	})
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERRORS.USER.USER_NOT_FOUND),
	})
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
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERRORS.USER.USER_NOT_FOUND),
	})
	@Get('me')
	async me(@Authorized('id') userId: string) {
		return await this.userService.findById(userId);
	}
}
