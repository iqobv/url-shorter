'use client';

import { AbstractIntlMessages, Locale } from 'next-intl';
import { PropsWithChildren } from 'react';
import TanstackQueryProvider from './TanstackQueryProvider';
import ThemeProvider from './ThemeProvider';
import ToastProvider from './ToastProvider';
import TranslationsProvider from './TranslationsProvider';

interface MainProviderProps extends PropsWithChildren {
	messages: AbstractIntlMessages;
	locale: Locale;
}

const MainProvider = ({ children, messages, locale }: MainProviderProps) => {
	return (
		<TranslationsProvider messages={messages} locale={locale}>
			<TanstackQueryProvider>
				<ThemeProvider>
					<ToastProvider>{children}</ToastProvider>
				</ThemeProvider>
			</TanstackQueryProvider>
		</TranslationsProvider>
	);
};

export default MainProvider;
