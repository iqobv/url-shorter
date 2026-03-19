'use client';

import {
	AbstractIntlMessages,
	Locale,
	NextIntlClientProvider,
} from 'next-intl';
import { PropsWithChildren } from 'react';

interface TranslationsProviderProps extends PropsWithChildren {
	messages: AbstractIntlMessages;
	locale: Locale;
}

const TranslationsProvider = ({
	children,
	messages,
	locale,
}: TranslationsProviderProps) => {
	return (
		<NextIntlClientProvider
			messages={messages}
			locale={locale}
			timeZone="UTC"
		>
			{children}
		</NextIntlClientProvider>
	);
};

export default TranslationsProvider;
