import { Prisma } from '@generated/prisma/client';

export const publicUserSelect: Prisma.UserSelect = {
	id: true,
	username: true,
	displayName: true,
};
