import { HeaderMain } from '@/components/layout';

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<HeaderMain />
			<main className="page">{children}</main>
		</>
	);
}
