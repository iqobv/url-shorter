import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
	locales: ['en', 'uk'] as const,
	defaultLocale: 'en' as const,
});
