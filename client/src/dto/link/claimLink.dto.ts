import { claimLinkSchema } from '@/schemas';
import z from 'zod';

export type ClaimLinkDto = z.infer<typeof claimLinkSchema>;
