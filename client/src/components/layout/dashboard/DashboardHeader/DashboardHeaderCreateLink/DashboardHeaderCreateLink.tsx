'use client';

import Guard from '@/components/guard/Guard';
import { Button } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { PERMISSIONS } from '@/constants';
import styles from './DashboardHeaderCreateLink.module.scss';

interface DashboardHeaderCreateLinkProps {
	workspaceId: string;
	label: string;
}

const DashboardHeaderCreateLink = ({
	workspaceId,
	label,
}: DashboardHeaderCreateLinkProps) => {
	return (
		<Guard permissions={[PERMISSIONS.LINKS.CREATE]} fallback={<div />}>
			<Button
				variant="outline"
				className={styles['dashboard-header__new-button']}
				href={PRIVATE_PAGES.NEW_LINK(workspaceId)}
			>
				{label}
			</Button>
		</Guard>
	);
};

export default DashboardHeaderCreateLink;
