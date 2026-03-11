import { messages, routing } from '@/i18n';

declare module 'next-intl' {
	interface AppConfig {
		Messages: typeof messages;
		Locale: (typeof routing.locales)[number];
	}
}
