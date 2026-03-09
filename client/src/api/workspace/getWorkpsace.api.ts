import { IWorkspace } from '@/types';
import api from '../axios.api';

export const getWorkspaceById = async (workspaceId: string) =>
	(await api.get<IWorkspace>(`/v1/workspaces/id/${workspaceId}`)).data;
