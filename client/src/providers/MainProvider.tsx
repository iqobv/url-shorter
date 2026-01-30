'use client';

import { PropsWithChildren } from 'react';
import TanstackQueryProvider from './TanstackQueryProvider';
import ThemeProvider from './ThemeProvider';

const MainProvider = ({ children }: PropsWithChildren<unknown>) => {
	return (
		<TanstackQueryProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</TanstackQueryProvider>
	);
};

export default MainProvider;
