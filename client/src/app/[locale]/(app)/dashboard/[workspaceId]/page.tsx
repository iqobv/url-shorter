import { LinksTable } from '@/components/dashboard/links';
import { TPageParams } from '@/types';
import { generateTitle } from '@/utils';

export async function generateMetadata({ params }: { params: TPageParams }) {
	return generateTitle(params, 'metadata.pages.dashboard.default');
}

export default function DashboardPage() {
	return (
		<div>
			<LinksTable />
		</div>
	);
}
