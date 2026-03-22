import { CreateLink } from '@/components/dashboard/links';
import { PERMISSIONS } from '@/constants';
import { TPageParams, WorkspaceIdParams } from '@/types';
import { generateTitle, pageCheckPermission } from '@/utils';

export async function generateMetadata({ params }: { params: TPageParams }) {
	return generateTitle(params, 'metadata.pages.dashboard.links.linksNew');
}

export default async function NewLinkPage({ params }: WorkspaceIdParams) {
	await pageCheckPermission({
		params,
		requiredPermissions: [PERMISSIONS.LINKS.CREATE],
	});

	return (
		<div>
			<CreateLink />
		</div>
	);
}
