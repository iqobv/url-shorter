import { baseAuthSchema, registerSchema } from '@/schemas';
import z from 'zod';

export type LoginDto = z.infer<typeof baseAuthSchema>;
export type RegisterDto = z.infer<typeof registerSchema>;
