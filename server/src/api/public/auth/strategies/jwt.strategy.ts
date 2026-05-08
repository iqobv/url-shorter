import { ERRORS } from '@libs/constants';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		private readonly configService: ConfigService,
		private readonly userService: UserService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					return request?.cookies?.accessToken as string;
				},
			]),
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
		});
	}

	async validate(payload: { sub: string }) {
		const user = await this.userService.findById(payload.sub, false);

		if (!user) {
			throw new UnauthorizedException(ERRORS.USER.USER_NOT_FOUND);
		}

		return user;
	}
}
