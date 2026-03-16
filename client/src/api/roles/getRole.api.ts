import { IRole } from '@/types';
import api from '../axios.api';

export const getRole = async (workspaceId: string, roleId: string) =>
	(await api.get<IRole>(`/v1/roles/workspace/${workspaceId}/role/${roleId}`))
		.data;
