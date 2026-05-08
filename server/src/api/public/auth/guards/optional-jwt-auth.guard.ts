import { User } from '@generated/prisma/client';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
	handleRequest<TUser = User>(
		err: Error | null,
		user: TUser | false,
		_info: unknown,
		_context: ExecutionContext,
		_status?: unknown,
	): TUser | null {
		if (err || !user) {
			return null;
		}

		return user;
	}
}
