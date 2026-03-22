import { RolesTable } from '@/components/dashboard/roles';
import { PERMISSIONS } from '@/constants';
import { TPageParams, WorkspaceIdParams } from '@/types';
import { generateTitle, pageCheckPermission } from '@/utils';

export async function generateMetadata({ params }: { params: TPageParams }) {
	return generateTitle(params, 'metadata.pages.dashboard.roles.default');
}

export default async function RolesPage({ params }: WorkspaceIdParams) {
	await pageCheckPermission({
		params,
		requiredPermissions: [
			PERMISSIONS.ROLES.VIEW,
			PERMISSIONS.ROLES.EDIT,
			PERMISSIONS.ROLES.CREATE,
			PERMISSIONS.ROLES.DELETE,
		],
	});

	return (
		<div>
			<RolesTable />
		</div>
	);
}
