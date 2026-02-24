import z from 'zod';

export type EmailErrorKeys = 'email.invalidEmail';

export const emailSchema = z.object({
	email: z.email({
		error: 'email.invalidEmail',
	}),
});
