import { Locale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing.i18n';

export default getRequestConfig(async ({ requestLocale }) => {
	let locale: Locale =
		((await requestLocale) as Locale) || routing.defaultLocale;

	if (!routing.locales.includes(locale as Locale)) {
		locale = routing.defaultLocale as Locale;
	}

	const messages = (await import(`./messages/${locale}/index.ts`)).default;

	return {
		locale: locale,
		messages: messages,
	};
});
