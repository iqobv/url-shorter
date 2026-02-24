import { HeaderAuth } from '@/components/layout';
import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
	return (
		<div className="page">
			<HeaderAuth />
			<main className="container">{children}</main>
		</div>
	);
}
