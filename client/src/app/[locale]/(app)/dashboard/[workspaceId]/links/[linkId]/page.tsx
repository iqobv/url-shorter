import { PERMISSIONS } from '@/constants';
import { WorkspaceIdParams } from '@/types';
import { pageCheckPermission } from '@/utils';

export default async function LinkPage({ params }: WorkspaceIdParams) {
	await pageCheckPermission({
		params,
		requiredPermissions: [
			PERMISSIONS.LINKS.VIEW_ALL,
			PERMISSIONS.LINKS.DELETE_ALL,
			PERMISSIONS.LINKS.EDIT_ALL,
		],
	});

	return <div></div>;
}
