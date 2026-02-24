import { Locale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing.i18n';

export default getRequestConfig(async ({ requestLocale }) => {
	const locale = await requestLocale;

	const finalLocale: Locale =
		locale && routing.locales.includes(locale as Locale)
			? (locale as Locale)
			: routing.defaultLocale;

	return {
		locale: finalLocale,
		messages: (await import(`./messages/${finalLocale}.json`)).default,
	};
});
