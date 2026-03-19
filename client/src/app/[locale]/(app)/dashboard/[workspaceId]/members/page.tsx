import { MembersTable } from '@/components/dashboard/members';
import { PRIVATE_PAGES } from '@/config';
import { PERMISSIONS } from '@/constants';
import { WorkspaceIdParams } from '@/types';
import { canPerformActionServer } from '@/utils';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
	title: 'Members',
};

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
