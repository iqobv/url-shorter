import { IRole } from '@/types';
import api from '../axios.api';

export const getRoles = async (workspaceId: string) =>
	(await api.get<IRole[]>(`/v1/roles/workspace/${workspaceId}`)).data;
