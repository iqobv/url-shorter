import { TUserPermissions } from '@/types';
import api from '../axios.api';

const ENDPOINT = (workspaceId: string) =>
	`/v1/workspace-members/workspace/${workspaceId}/my-permissions`;

export const getUserPermissions = async (workspaceId: string) =>
	(await api.get<TUserPermissions>(ENDPOINT(workspaceId))).data;

export const getServerUserPermissions = async (
	workspaceId: string,
	cookie: string,
) =>
	(
		await api.get<TUserPermissions>(ENDPOINT(workspaceId), {
			headers: {
				Cookie: cookie,
			},
		})
	).data;
