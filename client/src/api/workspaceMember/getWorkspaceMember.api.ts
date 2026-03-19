import { IWorkspaceMemberWithUser } from '@/types';
import api from '../axios.api';

export const getWorkspaceMember = async (
	workspaceId: string,
	memberId: string,
) =>
	(
		await api.get<IWorkspaceMemberWithUser>(
			`/v1/workspace-members/workspace/${workspaceId}/member/${memberId}`,
		)
	).data;
