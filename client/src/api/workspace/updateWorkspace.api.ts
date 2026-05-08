import { UpdateWorkspaceDto } from '@/dto';
import api from '../axios.api';

export const updateWorkspace = async (id: string, dto: UpdateWorkspaceDto) =>
	(await api.patch(`/v1/workspaces/${id}`, dto)).data;
