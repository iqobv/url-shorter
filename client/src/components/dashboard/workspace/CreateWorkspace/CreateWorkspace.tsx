'use client';

import { createWorkspace } from '@/api';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { CreateWorkspaceDto } from '@/dto';
import { createWorkspaceSchema } from '@/schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import WorkspaceForm from '../WorkspaceForm/WorkspaceForm';
import styles from './CreateWorkspace.module.scss';
import { CREATE_WORKSPACE_FIELDS } from './createWorkspaceFields';

const CreateWorkspace = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: (data: CreateWorkspaceDto) => createWorkspace(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.WORKSPACE.ALL_WORKSPACES,
			});
			router.push(PRIVATE_PAGES.DASHBOARD_WORKSPACE(data.id));
			if (data.isDefault) {
				queryClient.invalidateQueries({
					queryKey: QUERY_KEYS.WORKSPACE.DEFAULT,
				});
			}
		},
	});

	return (
		<div className={styles.createWorkspace}>
			<WorkspaceForm<CreateWorkspaceDto>
				schema={createWorkspaceSchema}
				fields={CREATE_WORKSPACE_FIELDS}
				onSubmit={(data) => mutate(data)}
				defaultValues={{
					name: '',
					isPersonal: true,
					isDefault: false,
				}}
				isLoading={isPending}
			/>
		</div>
	);
};

export default CreateWorkspace;
