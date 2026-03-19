import { CreateRole } from '@/components/dashboard/roles';
import { PERMISSIONS } from '@/constants';
import { WorkspaceIdParams } from '@/types';
import { pageCheckPermission } from '@/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Create Role',
};

export default async function NewRolePage({ params }: WorkspaceIdParams) {
	await pageCheckPermission({
		params,
		requiredPermissions: [PERMISSIONS.ROLES.CREATE],
	});

	return <CreateRole />;
}
