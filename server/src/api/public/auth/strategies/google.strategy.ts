import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { OauthService } from '../oauth/oauth.service';

const GOOGLE_PROVIDER = 'google';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
	Strategy,
	GOOGLE_PROVIDER,
) {
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService,
		private readonly oauthService: OauthService,
	) {
		super({
			clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
			clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
			callbackURL: configService.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
			scope: ['email', 'profile'],
		});
	}

	async validate(
		_accessToken: string,
		_refreshToken: string,
		profile: Profile,
	) {
		const { id, emails, name, displayName } = profile;

		if (!emails || !emails.length) {
			throw new Error('No email found in Google profile');
		}

		const usernameBase = name?.givenName || 'user';
		const username = await this.authService.generateUsername(usernameBase);

		const user = await this.oauthService.validateOAuthUser({
			email: emails[0].value,
			providerId: id,
			provider: GOOGLE_PROVIDER,
			username,
			displayName,
		});

		return user;
	}
}
