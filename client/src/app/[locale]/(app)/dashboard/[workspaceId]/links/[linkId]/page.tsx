import { LinkAnalytics } from '@/components/dashboard/links';
import { PERMISSIONS } from '@/constants';
import { TPageParams, WorkspaceIdParams } from '@/types';
import { generateTitle, pageCheckPermission } from '@/utils';

export async function generateMetadata({ params }: { params: TPageParams }) {
	return generateTitle(params, 'metadata.pages.dashboard.links.linkView');
}

export default async function LinkPage({ params }: WorkspaceIdParams) {
	await pageCheckPermission({
		params,
		requiredPermissions: [
			PERMISSIONS.LINKS.VIEW_ALL,
			PERMISSIONS.LINKS.DELETE_ALL,
			PERMISSIONS.LINKS.EDIT_ALL,
		],
	});

	return (
		<div>
			<LinkAnalytics />
		</div>
	);
}
