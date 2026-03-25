import { messages } from '@/i18n';
import { createErrorSchema } from '@/utils';
import { NestedKeyOf } from 'next-intl';
import z from 'zod';

export type CreateLinkMessages = NestedKeyOf<typeof messages>;

const msg = createErrorSchema<CreateLinkMessages>();

export const defaultLinkSchema = z.object({
	originalUrl: z
		.url(msg('links.errors.originalUrl.url'))
		.min(1, msg('links.errors.originalUrl.required')),
	customAlias: z
		.string()
		.min(3, msg('links.errors.customAlias.minLength'))
		.max(100, msg('links.errors.customAlias.maxLength'))
		.or(z.literal('')),
});
