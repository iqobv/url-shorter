'use client';

import { getRole, updateRole } from '@/api';
import { QUERY_KEYS } from '@/config';
import { UpdateRoleDto } from '@/dto';
import { useWorkspaceId } from '@/hooks';
import { updateRoleSchema } from '@/schemas';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import RoleForm from '../RoleForm/RoleForm';

const UpdateRole = () => {
	const workspaceId = useWorkspaceId();
	const { roleId } = useParams<{ roleId: string }>();

	const { data: role, refetch } = useQuery({
		queryFn: () => getRole(workspaceId, roleId),
		queryKey: QUERY_KEYS.ROLES.ROLE(workspaceId, roleId),
		enabled: !!workspaceId && !!roleId,
	});

	const { mutate } = useMutation({
		mutationFn: (dto: UpdateRoleDto) => updateRole(workspaceId, roleId, dto),
		mutationKey: QUERY_KEYS.ROLES.UPDATE_ROLE(workspaceId, roleId),
		onSuccess: () => {
			refetch();
		},
	});

	return (
		<div>
			{role && (
				<RoleForm<UpdateRoleDto>
					schema={updateRoleSchema}
					onSubmit={(data) => mutate(data)}
					actionTranslationKeys={{
						cancel: 'update.cancel',
						submit: 'update.submit',
					}}
					showActionOnDirty
					defaultValues={{
						name: role.name,
						permissions: role.permissions,
					}}
				/>
			)}
		</div>
	);
};

export default UpdateRole;
