import { CreateWorkspaceDto } from '@/dto';
import { IWorkspace } from '@/types';
import api from '../axios.api';

export const createWorkspace = async (dto: CreateWorkspaceDto) =>
	(await api.post<IWorkspace>('/v1/workspaces', dto)).data;
