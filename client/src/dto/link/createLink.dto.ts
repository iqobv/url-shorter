import { createAuthorizedLinkSchema, defaultLinkSchema } from '@/schemas';
import z from 'zod';

export type CreateLinkDto = z.infer<typeof defaultLinkSchema>;
export type CreateAuthorizedLinkDto = z.infer<
	typeof createAuthorizedLinkSchema
>;
