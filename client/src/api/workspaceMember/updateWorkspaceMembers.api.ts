import { UpdateWorkspaceMemberDto } from '@/dto';
import { IWorkspaceMember } from '@/types';
import api from '../axios.api';

export const updateWorkspaceMember = async (
	workspaceId: string,
	memberId: string,
	dto: UpdateWorkspaceMemberDto,
) =>
	(
		await api.patch<IWorkspaceMember>(
			`/v1/workspace-members/workspace/${workspaceId}/member/${memberId}`,
			dto,
		)
	).data;
