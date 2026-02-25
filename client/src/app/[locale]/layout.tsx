import { getServerUser } from '@/api';
import { MainProvider } from '@/providers';
import type { Metadata } from 'next';
import { Locale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import '../index.scss';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: {
		template: '%s - Shortly',
		default: 'Shortly',
	},
	description: 'A URL shortening service with a statistics dashboard.',
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: Locale }>;
}>) {
	const { locale } = await params;
	const messages = await getMessages();

	const cookieStore = await cookies();
	const cookieString = cookieStore.toString();
	const hasRefreshToken = cookieStore.has('refreshToken');

	let initialUser = null;

	if (hasRefreshToken) {
		initialUser = await getServerUser(cookieString).catch(() => null);
	}

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<MainProvider
					messages={messages}
					locale={locale}
					initialUser={initialUser}
					hasRefreshToken={hasRefreshToken}
				>
					{children}
				</MainProvider>
			</body>
		</html>
	);
}
