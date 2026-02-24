import z from 'zod';
import { EmailErrorKeys, emailSchema } from './email.schema';
import { PasswordErrorKeys, passwordSchema } from './password.schema';

export type BaseAuthErrorKeys = EmailErrorKeys | PasswordErrorKeys;

export const baseAuthSchema = z
	.object({})
	.extend(emailSchema.shape)
	.extend(passwordSchema.shape);
