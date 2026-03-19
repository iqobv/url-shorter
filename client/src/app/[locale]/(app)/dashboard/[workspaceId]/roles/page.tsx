import { RolesTable } from '@/components/dashboard/roles';
import { PERMISSIONS } from '@/constants';
import { WorkspaceIdParams } from '@/types';
import { pageCheckPermission } from '@/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Roles',
};

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
