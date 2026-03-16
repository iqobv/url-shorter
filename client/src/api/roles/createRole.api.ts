import { CreateRoleDto } from '@/dto';
import { IRole } from '@/types';
import api from '../axios.api';

export const createRole = async (workspaceId: string, dto: CreateRoleDto) =>
	(await api.post<IRole>(`/v1/roles/workspace/${workspaceId}`, dto)).data;
