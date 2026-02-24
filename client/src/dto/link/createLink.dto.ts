import { createLinkSchema } from '@/schemas';
import z from 'zod';

export type CreateLinkDto = z.infer<typeof createLinkSchema>;
