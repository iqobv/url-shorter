import z from 'zod';

export const createLinkSchema = z.object({
	originalUrl: z.url().min(1, { error: 'Original URL is required' }),
	customAlias: z.string().min(1).optional(),
});
