import { existsSync, readdirSync } from 'fs';
import { Locale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { join } from 'path';
import { routing } from './routing.i18n';

export default getRequestConfig(async ({ requestLocale }) => {
	const locale = await requestLocale;

	const finalLocale: Locale =
		locale && routing.locales.includes(locale as Locale)
			? (locale as Locale)
			: routing.defaultLocale;

	const messagesDir = join(
		process.cwd(),
		'src',
		'i18n',
		'messages',
		finalLocale,
	);

	let files: string[] = [];

	if (existsSync(messagesDir)) {
		files = readdirSync(messagesDir)
			.filter((f) => f.endsWith('.json'))
			.map((f) => f.replace('.json', ''));
	}

	const messagesArray = await Promise.all(
		files.map(async (file) => {
			try {
				const imported = await import(`./messages/${finalLocale}/${file}.json`);
				return { [file]: imported.default };
			} catch (e) {
				console.log(e);
				return {};
			}
		}),
	);

	const messages = Object.assign({}, ...messagesArray);

	return {
		locale: finalLocale,
		messages: messages,
	};
});
