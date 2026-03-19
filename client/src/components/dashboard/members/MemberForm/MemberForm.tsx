'use client';

import { getWorkspaceMember, updateWorkspaceMember } from '@/api';
import { Form, Input } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { PERMISSIONS } from '@/constants';
import { UpdateWorkspaceMemberDto } from '@/dto';
import { useWorkspaceId } from '@/hooks';
import { updateWorkspaceMemberSchema } from '@/schemas';
import { useCanPerformAction } from '@/stores';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import styles from './MemberForm.module.scss';

const MemberForm = () => {
	const { can: canEditMember, isLoaded } = useCanPerformAction([
		PERMISSIONS.MEMBERS.EDIT,
	]);
	const workspaceId = useWorkspaceId();
	const { memberId } = useParams<{ memberId: string }>();

	const { data: workspaceMember } = useQuery({
		queryFn: () => getWorkspaceMember(workspaceId, memberId),
		queryKey: QUERY_KEYS.WORKSPACE_MEMBERS.GET_BY_ID(workspaceId, memberId),
		enabled: !!workspaceId && !!memberId,
	});

	const {} = useMutation({
		mutationFn: (dto: UpdateWorkspaceMemberDto) =>
			updateWorkspaceMember(workspaceId, memberId, dto),
	});

	if (!workspaceMember) return null;

	return (
		<div className={styles['member']}>
			<Form<UpdateWorkspaceMemberDto>
				schema={updateWorkspaceMemberSchema}
				defaultValues={{
					displayName:
						workspaceMember.displayName ||
						workspaceMember.user.displayName ||
						workspaceMember.user.username ||
						'',
					permissions: workspaceMember.permissions || [],
					roleIds: workspaceMember.roles.map((role) => role.id) || [],
				}}
			>
				<Form.Field<UpdateWorkspaceMemberDto> name="displayName">
					<Input disabled={isLoaded && !canEditMember} />
				</Form.Field>
			</Form>
		</div>
	);
};

export default MemberForm;
