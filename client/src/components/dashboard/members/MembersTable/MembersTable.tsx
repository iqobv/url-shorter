'use client';

import { getRoles, getWorkspaceMembers } from '@/api';
import { Button, Table } from '@/components/ui';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { useWorkspaceId } from '@/hooks';
import { IRole } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { getCoreRowModel } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { MdEdit } from 'react-icons/md';
import MembersTableRolesCell from './MembersTableRolesCell/MembersTableRolesCell';

const MembersTable = () => {
	const t = useTranslations('workspaceMember.columns');

	const workspaceId = useWorkspaceId();

	const { data } = useQuery({
		queryFn: () => getWorkspaceMembers(workspaceId),
		queryKey: QUERY_KEYS.WORKSPACE_MEMBERS.GET_ALL(workspaceId),
		enabled: !!workspaceId,
	});

	const { data: rolesData = [] } = useQuery({
		queryFn: () => getRoles(workspaceId),
		queryKey: QUERY_KEYS.ROLES.ALL_ROLES(workspaceId),
	});

	return (
		<div>
			<Table
				data={data || []}
				columns={[
					{
						header: t('name'),
						accessorKey: 'displayName',
						enableSorting: false,
						meta: {
							style: { width: '99%' },
						},
					},
					{
						header: t('roles'),
						accessorKey: 'roles',
						enableSorting: false,
						cell: ({ getValue, row }) => {
							const value: IRole[] = getValue();
							const workspaceMemberId = row.original.id;

							if (!workspaceMemberId && !rolesData.length) return null;

							return (
								<MembersTableRolesCell
									roles={value}
									workspaceMemberId={workspaceMemberId}
									rolesData={rolesData}
								/>
							);
						},
					},
					{
						header: t('actions'),
						accessorKey: 'actions',
						enableSorting: false,
						cell: ({ row }) => {
							const workspaceMemberId = row.original.id;

							return (
								<Button
									isIcon
									variant="ghost"
									isRounded
									href={PRIVATE_PAGES.MEMBER(workspaceId, workspaceMemberId)}
								>
									<MdEdit />
								</Button>
							);
						},
					},
				]}
				getCoreRowModel={getCoreRowModel()}
			/>
		</div>
	);
};

export default MembersTable;
