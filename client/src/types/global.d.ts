import { messages, routing } from '@/i18n';

type Messages = typeof messages;

declare module 'next-intl' {
	interface AppConfig {
		Messages: Messages;
		Locale: (typeof routing.locales)[number];
	}

	type IntlMessages = Messages;
}
