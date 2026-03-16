import { PERMISSIONS } from '@/constants';
import z from 'zod';

const permissionValues = Object.values(PERMISSIONS).flatMap((group) =>
	Object.values(group),
);

export const createRoleSchema = z.object({
	name: z.string().min(3).max(60),
	permissions: z
		.array(z.enum(permissionValues as [string, ...string[]]))
		.default([]),
});
