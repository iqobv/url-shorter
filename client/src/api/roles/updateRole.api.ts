import { UpdateRoleDto } from '@/dto';
import { IRole } from '@/types';
import api from '../axios.api';

export const updateRole = async (
	workspaceId: string,
	roleId: string,
	dto: UpdateRoleDto,
) =>
	(
		await api.patch<IRole>(
			`/v1/roles/workspace/${workspaceId}/role/${roleId}`,
			dto,
		)
	).data;
