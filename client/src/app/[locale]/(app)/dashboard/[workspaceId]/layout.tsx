'use client';

import { DashboardHeader, DashboardSidebar } from '@/components/layout';
import { useGetPermissions, useWorkspace } from '@/hooks';
import { useGetExpanded, useSetWorkspace } from '@/stores';
import { useEffect } from 'react';
import styles from './layout.module.scss';

interface WorkspaceLayoutProps {
	children: React.ReactNode;
	header: React.ReactNode;
	modal: React.ReactNode;
}

export default function WorkspaceLayout({
	children,
	header,
	modal,
}: WorkspaceLayoutProps) {
	const expanded = useGetExpanded();

	const { data } = useWorkspace();
	useGetPermissions();

	const setWorkspace = useSetWorkspace();

	useEffect(() => {
		if (data) setWorkspace(data);
	}, [data, setWorkspace]);

	return (
		<div
			className={styles['dashboard-layout']}
			data-sidebar-expanded={expanded}
		>
			<DashboardSidebar />
			<div className={styles['dashboard-layout__content']}>
				<DashboardHeader>{header}</DashboardHeader>
				<main className={styles['dashboard-layout__main']}>
					{children}
					{modal}
				</main>
			</div>
		</div>
	);
}
