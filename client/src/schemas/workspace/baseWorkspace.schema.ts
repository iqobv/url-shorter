import { TMessages } from '@/types';
import { createErrorSchema } from '@/utils';
import z from 'zod';

const msg = createErrorSchema<TMessages>();

export const baseWorkspaceSchema = z.object({
	isPersonal: z.boolean().optional().default(true),
	isDefault: z.boolean().optional().default(false),
	name: z
		.string(msg('workspaces.errors.workspaceNameRequired'))
		.min(2, msg('workspaces.errors.workspaceNameTooShort'))
		.max(60, msg('workspaces.errors.workspaceNameTooLong')),
});
