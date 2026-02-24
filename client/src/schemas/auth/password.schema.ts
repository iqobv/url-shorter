import z from 'zod';

export type PasswordErrorKeys =
	| 'password.required'
	| 'password.tooShort'
	| 'password.mustContainUppercase'
	| 'password.mustContainLowercase'
	| 'password.mustContainNumber';

export const passwordSchema = z.object({
	password: z
		.string({
			error: 'password.required',
		})
		.min(8, { error: 'password.tooShort' })
		.refine((val) => /[A-Z]/.test(val), {
			error: 'password.mustContainUppercase',
		})
		.refine((val) => /[a-z]/.test(val), {
			error: 'password.mustContainLowercase',
		})
		.refine((val) => /[0-9]/.test(val), {
			error: 'password.mustContainNumber',
		}),
});
