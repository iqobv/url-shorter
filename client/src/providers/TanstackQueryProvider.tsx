'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';

const TanstackQueryProvider = ({ children }: PropsWithChildren<unknown>) => {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
					refetchOnMount: true,
				},
			},
		}),
	);
	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default TanstackQueryProvider;
