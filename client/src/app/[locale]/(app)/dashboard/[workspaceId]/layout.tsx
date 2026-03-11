'use client';

import { useGetPermissions, useWorkspace } from '@/hooks';
import { useSetWorkspace } from '@/stores';
import { useEffect } from 'react';

interface WorkspaceLayoutProps {
	children: React.ReactNode;
	modal: React.ReactNode;
}

export default function WorkspaceLayout({
	children,
	modal,
}: WorkspaceLayoutProps) {
	const { data } = useWorkspace();
	useGetPermissions();

	const setWorkspace = useSetWorkspace();

	useEffect(() => {
		if (data) setWorkspace(data);
	}, [data, setWorkspace]);

	return (
		<>
			{children}
			{modal}
		</>
	);
}
