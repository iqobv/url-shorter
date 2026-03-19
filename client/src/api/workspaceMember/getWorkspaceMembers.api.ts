import { IWorkspaceMember } from '@/types';
import api from '../axios.api';

export const getWorkspaceMembers = async (workspaceId: string) =>
	(
		await api.get<IWorkspaceMember[]>(
			`/v1/workspace-members/workspace/${workspaceId}`,
		)
	).data;
