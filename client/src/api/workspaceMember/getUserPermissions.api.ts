import { TUserPermissions } from '@/types';
import api from '../axios.api';

export const getUserPermissions = async (workspaceId: string) =>
	(
		await api.get<TUserPermissions>(
			`/v1/workspace-members/workspace/${workspaceId}/my-permissions`,
		)
	).data;
