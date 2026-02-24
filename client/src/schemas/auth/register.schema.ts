import z from 'zod';
import { baseAuthSchema } from './baseAuth.schema';
import { EmailErrorKeys } from './email.schema';
import { PasswordErrorKeys } from './password.schema';

export type RegisterErrorKeys =
	| 'confirmPassword.required'
	| 'confirmPassword.mustMatch'
	| PasswordErrorKeys
	| EmailErrorKeys;

export const registerSchema = z
	.object({
		confirmPassword: z.string({
			error: 'confirmPassword.required',
		}),
	})
	.extend(baseAuthSchema.shape)
	.refine((data) => data.password === data.confirmPassword, {
		error: 'confirmPassword.mustMatch',
		path: ['confirmPassword'],
	});
