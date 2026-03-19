'use client';

import { IUser } from '@/types';
import { AbstractIntlMessages, Locale } from 'next-intl';
import { PropsWithChildren } from 'react';
import TanstackQueryProvider from './TanstackQueryProvider';
import ThemeProvider from './ThemeProvider';
import ToastProvider from './ToastProvider';
import TranslationsProvider from './TranslationsProvider';
import UserProvider from './UserProvider';

interface MainProviderProps extends PropsWithChildren {
	messages: AbstractIntlMessages;
	locale: Locale;
	initialUser?: IUser | null;
	hasRefreshToken?: boolean;
}

const MainProvider = ({
	children,
	messages,
	locale,
	initialUser,
	hasRefreshToken,
}: MainProviderProps) => {
	return (
		<TranslationsProvider
			messages={messages}
			locale={locale}
		>
			<TanstackQueryProvider>
				<UserProvider
					initialUser={initialUser}
					hasRefreshToken={hasRefreshToken}
				>
					<ThemeProvider>
						<ToastProvider>{children}</ToastProvider>
					</ThemeProvider>
				</UserProvider>
			</TanstackQueryProvider>
		</TranslationsProvider>
	);
};

export default MainProvider;
