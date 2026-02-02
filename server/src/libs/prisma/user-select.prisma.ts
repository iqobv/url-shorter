import { Prisma } from 'generated/prisma/browser';

export const userSelect: Prisma.UserSelect = {
	id: true,
	email: true,
	emailVerified: true,
	role: true,
	createdAt: true,
	updatedAt: true,
};
