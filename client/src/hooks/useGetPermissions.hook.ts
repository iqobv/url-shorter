'use client';

import { getUserPermissions } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useSetPermissions } from '@/stores';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useWorkspaceId } from './useWorkspaceId.hook';

export const useGetPermissions = () => {
	const workspaceId = useWorkspaceId();

	const setPermissions = useSetPermissions();

	const { data } = useQuery({
		queryFn: () => getUserPermissions(workspaceId),
		queryKey: QUERY_KEYS.WORKSPACE_MEMBERS.USER_PERMISSIONS(workspaceId),
		enabled: !!workspaceId,
	});

	useEffect(() => {
		if (data) setPermissions(data);
	}, [data, setPermissions]);
};
