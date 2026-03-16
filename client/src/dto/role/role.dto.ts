import { createRoleSchema, updateRoleSchema } from '@/schemas';
import z from 'zod';

export type CreateRoleDto = z.infer<typeof createRoleSchema>;
export type UpdateRoleDto = z.infer<typeof updateRoleSchema>;
