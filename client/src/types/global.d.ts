import { routing } from '@/i18n';
import api from '@/i18n/messages/en/api.json';
import auth from '@/i18n/messages/en/auth.json';
import dashboard from '@/i18n/messages/en/dashboard.json';
import form from '@/i18n/messages/en/form.json';
import header from '@/i18n/messages/en/header.json';
import home from '@/i18n/messages/en/home.json';
import links from '@/i18n/messages/en/links.json';
import shorten from '@/i18n/messages/en/shorten.json';

const messages = {
	api,
	auth,
	dashboard,
	form,
	header,
	home,
	shorten,
	links,
} as const;

declare module 'next-intl' {
	interface AppConfig {
		Messages: typeof messages;
		Locale: (typeof routing.locales)[number];
	}
}
