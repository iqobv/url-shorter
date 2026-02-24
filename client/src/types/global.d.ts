import { routing } from '@/i18n';
import messages from '@/i18n/messages/en.json';

declare module 'next-intl' {
	interface AppConfig {
		Messages: typeof messages;
		Locale: (typeof routing.locales)[number];
	}
}
