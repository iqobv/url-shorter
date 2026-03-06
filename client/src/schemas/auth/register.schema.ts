import z from 'zod';
import { baseAuthSchema } from './baseAuth.schema';
import { EmailErrorKeys } from './email.schema';
import { PasswordErrorKeys } from './password.schema';

export type RegisterErrorKeys =
	| 'confirmPassword.required'
	| 'confirmPassword.mustMatch'
	| 'username.required'
	| 'username.tooShort'
	| 'username.tooLong'
	| PasswordErrorKeys
	| EmailErrorKeys;

export const registerSchema = z
	.object({
		confirmPassword: z.string({
			error: 'confirmPassword.required',
		}),
		username: z
			.string({
				error: 'username.required',
			})
			.min(4, { error: 'username.tooShort' })
			.max(40, { error: 'username.tooLong' }),
	})
	.extend(baseAuthSchema.shape)
	.refine((data) => data.password === data.confirmPassword, {
		error: 'confirmPassword.mustMatch',
		path: ['confirmPassword'],
	});
