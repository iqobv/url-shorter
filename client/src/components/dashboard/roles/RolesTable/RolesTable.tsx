'use client';

import { getRoles } from '@/api';
import { Button } from '@/components/ui';
import Table from '@/components/ui/Table/Table';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { useWorkspaceId } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { getCoreRowModel } from '@tanstack/react-table';
import { MdDelete, MdEdit, MdPerson } from 'react-icons/md';
import styles from './RolesTable.module.scss';

const RolesTable = () => {
	const workspaceId = useWorkspaceId();

	const { data } = useQuery({
		queryFn: () => getRoles(workspaceId),
		queryKey: QUERY_KEYS.ROLES.ALL_ROLES(workspaceId),
		enabled: !!workspaceId,
	});

	return (
		<div>
			<Table
				columns={[
					{
						header: 'Name',
						accessorKey: 'name',
						enableSorting: false,
						meta: {
							expand: true,
						},
					},
					{
						header: 'Members',
						accessorKey: 'members',
						cell: (props) => (
							<div className={styles['member-cell']}>
								{props.cell.getValue()}
								<MdPerson />
							</div>
						),
						enableSorting: false,
					},
					{
						header: 'Actions',
						accessorKey: 'actions',
						cell: ({ cell }) => {
							const roleId = cell.row.original.id;
							return (
								<div className={styles['actions-cell']}>
									<Button
										isIcon
										isRounded
										variant="ghost"
										href={PRIVATE_PAGES.ROLE(workspaceId, roleId)}
									>
										<MdEdit />
									</Button>
									<Button
										isIcon
										isRounded
										variant="ghost"
									>
										<MdDelete />
									</Button>
								</div>
							);
						},
						enableSorting: false,
					},
				]}
				data={data ?? []}
				getCoreRowModel={getCoreRowModel()}
			/>
		</div>
	);
};

export default RolesTable;
