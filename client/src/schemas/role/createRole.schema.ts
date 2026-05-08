import { PERMISSIONS } from '@/constants';
import { TMessages } from '@/types';
import { createErrorSchema } from '@/utils';
import z from 'zod';

const permissionValues = Object.values(PERMISSIONS).flatMap((group) =>
	Object.values(group),
);

const msg = createErrorSchema<TMessages>();

export const createRoleSchema = z.object({
	name: z
		.string()
		.min(3, msg('role.form.fields.name.errors.min'))
		.max(60, msg('role.form.fields.name.errors.max')),
	permissions: z
		.array(
			z.enum(
				permissionValues as [string, ...string[]],
				msg('role.form.fields.permissions.errors.invalid'),
			),
		)
		.default([]),
});
