'use client';

import { useParams } from 'next/navigation';

export const useWorkspaceId = () => {
	const params = useParams<{ workspaceId: string }>();

	const { workspaceId } = params;

	return workspaceId;
};
