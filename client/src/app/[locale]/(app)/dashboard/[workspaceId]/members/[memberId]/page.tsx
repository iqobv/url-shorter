import { MemberForm } from '@/components/dashboard/members';
import { PERMISSIONS } from '@/constants';
import { WorkspaceIdParams } from '@/types';
import { pageCheckPermission } from '@/utils';

export default async function Page({ params }: WorkspaceIdParams) {
	await pageCheckPermission({
		params,
		requiredPermissions: [PERMISSIONS.MEMBERS.EDIT, PERMISSIONS.MEMBERS.VIEW],
	});

	return (
		<div>
			<MemberForm />
		</div>
	);
}
