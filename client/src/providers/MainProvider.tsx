'use client';

import { PUBLIC_PAGES } from '@/config';
import { IUser } from '@/types';
import { AbstractIntlMessages, Locale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';
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
	const router = useRouter();

	useEffect(() => {
		const handleUnauthorized = () => router.push(PUBLIC_PAGES.LOGIN);
		window.addEventListener('unauthorized', handleUnauthorized);
		return () => window.removeEventListener('unauthorized', handleUnauthorized);
	}, [router]);

	return (
		<TranslationsProvider messages={messages} locale={locale}>
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
