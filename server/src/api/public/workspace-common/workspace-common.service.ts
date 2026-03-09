import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ERRORS } from 'src/libs/constants';
import { publicUserSelect } from 'src/libs/prisma';

@Injectable()
export class WorkspaceCommonService {
	constructor(private readonly prismaService: PrismaService) {}

	async getWorkspaceById(workspaceId: string, userId: string) {
		const workspace = await this.prismaService.workspace.findFirst({
			where: {
				id: workspaceId,
				deletedAt: null,
				OR: [
					{ ownerId: userId },
					{ members: { some: { userId, deletedAt: null } }, isPersonal: false },
				],
			},
			include: {
				members: {
					where: { userId, deletedAt: null },
					include: {
						user: {
							select: publicUserSelect,
						},
						roles: {
							where: { deletedAt: null },
							include: { role: true },
						},
					},
				},
			},
		});

		if (!workspace)
			throw new NotFoundException(
				ERRORS.WORKSPACE.WORKSPACE_NOT_FOUND_OR_NO_PERMISSION,
			);

		return workspace;
	}

	async getWorkspace(workspaceId: string, userId: string) {
		const workspace = await this.getWorkspaceById(workspaceId, userId);

		if (workspace.isPersonal)
			throw new ForbiddenException(ERRORS.WORKSPACE.PERSONAL_WORKSPACE);

		return workspace;
	}
}
