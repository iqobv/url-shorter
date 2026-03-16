'use client';

import { createRole } from '@/api';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { CreateRoleDto } from '@/dto';
import { useWorkspaceId } from '@/hooks';
import { useRouter } from '@/i18n';
import { createRoleSchema } from '@/schemas';
import { useMutation } from '@tanstack/react-query';
import RoleForm from '../../RoleForm/RoleForm';

const CreateRoleForm = () => {
	const workspaceId = useWorkspaceId();
	const router = useRouter();

	const { mutate } = useMutation({
		mutationFn: (dto: CreateRoleDto) => createRole(workspaceId, dto),
		mutationKey: QUERY_KEYS.ROLES.CREATE_ROLE(workspaceId),
		onSuccess: (data) => {
			router.push(PRIVATE_PAGES.ROLE(workspaceId, data.id));
		},
	});

	return (
		<RoleForm<CreateRoleDto>
			schema={createRoleSchema}
			actionTranslationKeys={{
				cancel: 'create.cancel',
				submit: 'create.submit',
			}}
			onSubmit={(data) => mutate(data)}
			defaultValues={{
				name: '',
				permissions: [],
			}}
		/>
	);
};

export default CreateRoleForm;
