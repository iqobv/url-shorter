'use client';

import { DashboardHeader, DashboardSidebar } from '@/components/layout';
import { useGetExpanded } from '@/stores';
import styles from './layout.module.scss';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const expanded = useGetExpanded();

	return (
		<div
			className={styles['dashboard-layout']}
			data-sidebar-expanded={expanded}
		>
			<DashboardSidebar />
			<div className={styles['dashboard-layout__content']}>
				<DashboardHeader />
				<main className={styles['dashboard-layout__main']}>{children}</main>
			</div>
		</div>
	);
}
