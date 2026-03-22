import { MembersTable } from '@/components/dashboard/members';
import { PRIVATE_PAGES } from '@/config';
import { PERMISSIONS } from '@/constants';
import { TPageParams, WorkspaceIdParams } from '@/types';
import { canPerformActionServer, generateTitle } from '@/utils';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }: { params: TPageParams }) {
	return generateTitle(params, 'metadata.pages.dashboard.members.default');
}

export default async function MembersPage({ params }: WorkspaceIdParams) {
	const { workspaceId } = await params;

	const canPerform = await canPerformActionServer(workspaceId, [
		PERMISSIONS.MEMBERS.VIEW,
		PERMISSIONS.MEMBERS.EDIT,
		PERMISSIONS.MEMBERS.REMOVE,
	]);

	if (!canPerform) redirect(PRIVATE_PAGES.DASHBOARD_WORKSPACE(workspaceId));

	return (
		<div>
			<MembersTable />
		</div>
	);
}
