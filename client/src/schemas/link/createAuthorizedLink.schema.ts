import z from 'zod';
import { defaultLinkSchema } from './defaultLink.schema';

export const createAuthorizedLinkSchema = z
	.object({
		workspaceId: z.uuidv4(),
	})
	.extend(defaultLinkSchema.shape);
