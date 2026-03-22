'use client';

import { DashboardHeaderActionButton } from '@/components/layout';
import { PRIVATE_PAGES } from '@/config';
import { PERMISSIONS } from '@/constants';
import { useWorkspaceId } from '@/hooks';

export default function RolesPageButton() {
	const workspaceId = useWorkspaceId();

	return (
		<DashboardHeaderActionButton
			href={PRIVATE_PAGES.NEW_ROLE(workspaceId)}
			permissions={[PERMISSIONS.ROLES.CREATE]}
			label="newRole"
		/>
	);
}
