import { CreateLink } from '@/components/dashboard';
import { PERMISSIONS } from '@/constants';
import { WorkspaceIdParams } from '@/types';
import { pageCheckPermission } from '@/utils';

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
