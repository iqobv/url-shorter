'use client';

import { getWorkspaceById } from '@/api';
import { QUERY_KEYS } from '@/config';
import { IApiErrorResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useWorkspaceId } from './useWorkspaceId.hook';

export const useWorkspace = () => {
	const workspaceId = useWorkspaceId();

	const query = useQuery({
		queryFn: () => getWorkspaceById(workspaceId),
		queryKey: QUERY_KEYS.WORKSPACE.GET_WORKSPACE(workspaceId),
		enabled: !!workspaceId,
		retry: (failureCount, error: IApiErrorResponse) => {
			if (error.code === 'WORKSPACE_NOT_FOUND_OR_NO_PERMISSION') {
				return false;
			}
			return failureCount < 3;
		},
	});

	useEffect(() => {
		if (query.error) {
			console.log(query.error);
		}
	}, [query.error]);

	return query;
};
