import { UpdateRole } from '@/components/dashboard/roles';
import { PERMISSIONS } from '@/constants';
import { WorkspaceIdParams } from '@/types';
import { pageCheckPermission } from '@/utils';

export default async function RolePage({ params }: WorkspaceIdParams) {
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
			<UpdateRole />
		</div>
	);
}
