import { Injectable } from '@nestjs/common';
import type { Response } from 'express';
import { User } from 'generated/prisma/client';
import { UserProviderService } from 'src/api/user-provider/user-provider.service';
import { UserService } from 'src/api/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class OauthService {
	constructor(
		private readonly userService: UserService,
		private readonly userProviderService: UserProviderService,
		private readonly authService: AuthService,
	) {}

	async login(user: User, res: Response) {
		return await this.authService.createSession(user, res);
	}

	async validateOAuthUser(email: string, providerId: string) {
		const userProvider = await this.userProviderService.getByProviderId(
			'google',
			providerId,
		);

		if (userProvider) {
			return userProvider.user;
		}

		let user = await this.userService.findByEmail(email);

		if (!user) {
			user = await this.userService.createUser({ email, emailVerified: true });
		} else if (!user.emailVerified) {
			user = await this.userService.updateUser(user.id, {
				emailVerified: true,
			});
		}

		await this.userProviderService.createUserProvider({
			userId: user.id,
			provider: 'google',
			providerId,
		});

		return user;
	}
}
