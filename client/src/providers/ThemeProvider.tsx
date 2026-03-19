'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

const ThemeProvider = ({ children }: PropsWithChildren<unknown>) => {
	return (
		<NextThemesProvider
			enableSystem
			defaultTheme="system"
			attribute="class"
		>
			{children}
		</NextThemesProvider>
	);
};

export default ThemeProvider;
