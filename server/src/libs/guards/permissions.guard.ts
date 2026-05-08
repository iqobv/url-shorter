import { PrismaService } from '@infra/prisma/prisma.service';
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { ERRORS, PERMISSIONS } from '../constants';
import { PERMISSIONS_KEY } from '../decorators';
import { calculatePermissions } from '../utils';

@Injectable()
export class PermissionsGuard implements CanActivate {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
			PERMISSIONS_KEY,
			[context.getHandler(), context.getClass()],
		);

		const request: Request = context.switchToHttp().getRequest();
		const { user, params } = request;

		if (!user || typeof user !== 'object' || !('id' in user)) {
			throw new UnauthorizedException(ERRORS.AUTH.UNAUTHORIZED);
		}

		const workspace = await this.prismaService.workspace.findUnique({
			where: {
				id: params.workspaceId as string,
				OR: [
					{ ownerId: user.id as string },
					{ members: { some: { userId: user.id as string } } },
				],
			},
			select: {
				id: true,
				ownerId: true,
				members: {
					where: { userId: user.id as string },
					include: { roles: { include: { role: true } } },
				},
			},
		});

		if (!workspace || !workspace.members.length)
			throw new NotFoundException(
				ERRORS.WORKSPACE.WORKSPACE_NOT_FOUND_OR_NO_PERMISSION,
			);

		if (!requiredPermissions || requiredPermissions.length === 0) return true;

		const member = workspace.members?.[0];

		if (user.id === workspace.ownerId) {
			return true;
		}

		if (!member) {
			throw new ForbiddenException(ERRORS.WORKSPACE.NO_PERMISSION);
		}

		const effectivePermissions = calculatePermissions(member);

		const hasPermission =
			effectivePermissions.includes(PERMISSIONS.ADMIN.ALL) ||
			requiredPermissions.every((p) => effectivePermissions.includes(p));

		if (!hasPermission)
			throw new ForbiddenException(ERRORS.WORKSPACE.NO_PERMISSION);

		return true;
	}
}
