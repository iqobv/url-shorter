'use client';

import { DashboardHeaderActionButton } from '@/components/layout';
import { PRIVATE_PAGES } from '@/config';
import { PERMISSIONS } from '@/constants';
import { useWorkspaceId } from '@/hooks';

export default function DashboardPageButton() {
	const workspaceId = useWorkspaceId();

	return (
		<DashboardHeaderActionButton
			href={PRIVATE_PAGES.NEW_LINK(workspaceId)}
			permissions={[PERMISSIONS.LINKS.CREATE]}
			label={'newLink'}
		/>
	);
}
