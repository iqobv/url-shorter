import {
	baseWorkspaceSchema,
	createWorkspaceSchema,
	updateWorkspaceSchema,
} from '@/schemas';
import z from 'zod';

export type BaseWorkspaceDto = z.infer<typeof baseWorkspaceSchema>;
export type CreateWorkspaceDto = z.infer<typeof createWorkspaceSchema>;
export type UpdateWorkspaceDto = z.infer<typeof updateWorkspaceSchema>;
