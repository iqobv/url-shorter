import z from 'zod';

export const claimLinkSchema = z.object({
	linkId: z.uuidv4(),
	claimToken: z.string().min(1),
});
