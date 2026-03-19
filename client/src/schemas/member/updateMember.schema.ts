import z from 'zod';

export const updateWorkspaceMemberSchema = z.object({
	displayName: z.string().min(4).max(100).or(z.literal('')).optional(),
	roleIds: z.array(z.uuidv4()).min(1).or(z.literal('')),
	permissions: z.array(z.string()).min(1).or(z.literal('')).optional(),
});
