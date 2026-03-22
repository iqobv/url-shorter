import { CreateRole } from '@/components/dashboard/roles';
import { PERMISSIONS } from '@/constants';
import { TPageParams, WorkspaceIdParams } from '@/types';
import { generateTitle, pageCheckPermission } from '@/utils';

export async function generateMetadata({ params }: { params: TPageParams }) {
	return generateTitle(params, 'metadata.pages.dashboard.roles.rolesNew');
}
export default async function NewRolePage({ params }: WorkspaceIdParams) {
	await pageCheckPermission({
		params,
		requiredPermissions: [PERMISSIONS.ROLES.CREATE],
	});

	return <CreateRole />;
}
