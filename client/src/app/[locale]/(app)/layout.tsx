'use client';

import { DashboardHeader, DashboardSidebar } from '@/components/layout';
import '@/config/zod.config';
import { useGetExpanded } from '@/stores';
import styles from './layout.module.scss';

interface AppLayoutProps {
	children: React.ReactNode;
	header: React.ReactNode;
}

export default function AppLayout({ children, header }: AppLayoutProps) {
	const expanded = useGetExpanded();

	return (
		<div
			className={styles['dashboard-layout']}
			data-sidebar-expanded={expanded}
		>
			<DashboardSidebar />
			<div className={styles['dashboard-layout__content']}>
				<DashboardHeader>{header}</DashboardHeader>
				<main className={styles['dashboard-layout__main']}>{children}</main>
			</div>
		</div>
	);
}
