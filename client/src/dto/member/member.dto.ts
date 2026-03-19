import { updateWorkspaceMemberSchema } from '@/schemas';
import z from 'zod';

export type UpdateWorkspaceMemberDto = z.infer<
	typeof updateWorkspaceMemberSchema
>;
