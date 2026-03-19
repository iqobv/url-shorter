'use client';

import { updateWorkspaceMember } from '@/api';
import Guard from '@/components/guard/Guard';
import { Button, Checkbox, Dropdown, Form } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { PERMISSIONS } from '@/constants';
import { UpdateWorkspaceMemberDto } from '@/dto';
import { useWorkspaceId } from '@/hooks';
import { updateWorkspaceMemberSchema } from '@/schemas';
import { IRole } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import styles from './MembersTableRolesCell.module.scss';

interface MembersTableRolesCellProps {
	roles: IRole[];
	workspaceMemberId: string;
	rolesData: IRole[];
}

const MembersTableRolesCell = ({
	roles,
	workspaceMemberId,
	rolesData,
}: MembersTableRolesCellProps) => {
	const workspaceId = useWorkspaceId();
	const showAdditionalRoles = roles?.length > 1;
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: (dto: UpdateWorkspaceMemberDto) =>
			updateWorkspaceMember(workspaceId, workspaceMemberId, dto),
		mutationKey: QUERY_KEYS.WORKSPACE_MEMBERS.UPDATE(
			workspaceId,
			workspaceMemberId,
		),
		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey: QUERY_KEYS.WORKSPACE_MEMBERS.GET_ALL(workspaceId),
			});
		},
	});

	const handleFormSubmit = (data: UpdateWorkspaceMemberDto) => {
		mutate(data);
	};

	if (!roles) return null;

	return (
		<div className={styles['member-roles-cell']}>
			<p>{roles.length > 0 ? roles[0]?.name : 'Role'}</p>
			{showAdditionalRoles && (
				<Dropdown>
					<Dropdown.Trigger>
						<Button
							className={styles['additional-roles']}
							isIcon
							variant="ghost"
							tooltip="View All Roles"
						>
							+{roles.length - 1}
						</Button>
					</Dropdown.Trigger>
					<Dropdown.Menu width="content">
						{roles.slice(1).map((role) => (
							<Dropdown.Item key={role.id}>{role.name}</Dropdown.Item>
						))}
					</Dropdown.Menu>
				</Dropdown>
			)}
			<Guard permissions={[PERMISSIONS.MEMBERS.EDIT]}>
				<Form<UpdateWorkspaceMemberDto>
					schema={updateWorkspaceMemberSchema}
					defaultValues={{
						roleIds: roles.map((role) => role.id) || [],
					}}
					onSubmit={handleFormSubmit}
				>
					{({ handleSubmit, formState: { isDirty, errors } }) => {
						if (errors.root) {
							toast.error(errors.root.message);
						}

						return (
							<Dropdown
								onClose={() => {
									if (isDirty) {
										handleSubmit(handleFormSubmit)();
									}
								}}
							>
								<Dropdown.Trigger>
									<Button
										variant="ghost"
										isIcon
										isRounded
										className={styles['member-roles-cell__add-role']}
										tooltip="Add Role"
									>
										<FaPlus />
									</Button>
								</Dropdown.Trigger>
								<Dropdown.Menu width="content">
									{rolesData &&
										rolesData.map((role) => (
											<Dropdown.Item
												key={role.id}
												closeOnClick={false}
											>
												<Form.Field<UpdateWorkspaceMemberDto> name="roleIds">
													<Checkbox
														value={role.id}
														label={role.name}
													/>
												</Form.Field>
											</Dropdown.Item>
										))}
								</Dropdown.Menu>
							</Dropdown>
						);
					}}
				</Form>
			</Guard>
		</div>
	);
};

export default MembersTableRolesCell;
