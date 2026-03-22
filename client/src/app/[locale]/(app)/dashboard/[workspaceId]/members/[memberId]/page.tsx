import { MemberForm } from '@/components/dashboard/members';
import { PERMISSIONS } from '@/constants';
import { TPageParams, WorkspaceIdParams } from '@/types';
import { generateTitle, pageCheckPermission } from '@/utils';

export async function generateMetadata({ params }: { params: TPageParams }) {
	return generateTitle(params, 'metadata.pages.dashboard.members.membersView');
}

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
