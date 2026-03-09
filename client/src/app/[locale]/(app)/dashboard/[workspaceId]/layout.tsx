'use client';

import { useGetPermissions, useWorkspace } from '@/hooks';
import { useSetWorkspace } from '@/stores';
import { PropsWithChildren, useEffect } from 'react';

export default function WorkspaceLayout({ children }: PropsWithChildren) {
	const { data } = useWorkspace();
	useGetPermissions();

	const setWorkspace = useSetWorkspace();

	useEffect(() => {
		if (data) setWorkspace(data);
	}, [data, setWorkspace]);

	return <>{children}</>;
}
