'use client';

import { getWorkspaceLinks } from '@/api';
import { Button, Pagination, Table } from '@/components/ui';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { useWorkspaceId } from '@/hooks';
import { useRouter } from '@/i18n';
import { useGetUser } from '@/stores';
import { ILink } from '@/types';
import { useQuery } from '@tanstack/react-query';
import {
	getCoreRowModel,
	PaginationState,
	SortingState,
} from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { MdDelete, MdOpenInNew } from 'react-icons/md';
import LinkCell from './LinkCell/LinkCell';
import styles from './LinksTable.module.scss';
import LinksTableLoader from './LinksTableLoader';
import SlugCell from './SlugCell/SlugCell';

type TableLinkData = ILink | { id: string; isSkeleton: true };

const SKELETON_ROWS: TableLinkData[] = Array.from({ length: 10 }, (_, id) => ({
	id: `skeleton-${id}`,
	isSkeleton: true,
}));

const LinksTable = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const workspaceId = useWorkspaceId();

	const user = useGetUser();
	const t = useTranslations('links.columns');
	const pageFromUrl = Number(searchParams.get('page')) || 1;

	const [sorting, setSorting] = useState<SortingState>([
		{
			id: 'createdAt',
			desc: true,
		},
	]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: pageFromUrl - 1,
		pageSize: 20,
	});

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.LINK.ALL(workspaceId, pagination, sorting),
		queryFn: () => {
			const sortState = sorting[0];

			return getWorkspaceLinks(workspaceId, {
				page: pagination.pageIndex >= 0 ? pagination.pageIndex + 1 : 1,
				limit: pagination.pageSize,
				sortBy: sortState ? sortState.id : 'createdAt',
				sortOrder: sortState ? (sortState.desc ? 'desc' : 'asc') : 'desc',
			});
		},
		enabled: !!user || !!workspaceId,
	});

	const tableData = useMemo<TableLinkData[]>(() => {
		if (isLoading) return SKELETON_ROWS;
		return (data?.items || []).map((item) => ({
			...item,
			isSkeleton: false,
		}));
	}, [isLoading, data]);

	useEffect(() => {
		if (!data) return;

		const totalPages = data.meta.totalPages;

		if (totalPages > 0 && pageFromUrl > totalPages) {
			setPagination((prev) => ({
				...prev,
				pageIndex: totalPages - 1,
			}));

			const newSearchParams = new URLSearchParams(searchParams.toString());
			newSearchParams.set('page', totalPages.toString());
			router.push(`?${newSearchParams.toString()}`, { scroll: false });
		} else if (totalPages === 0 && pageFromUrl !== 1) {
			setPagination((prev) => ({
				...prev,
				pageIndex: 0,
			}));

			const newSearchParams = new URLSearchParams(searchParams.toString());
			newSearchParams.delete('page');
			router.push(`?${newSearchParams.toString()}`, { scroll: false });
		}
	}, [data, pageFromUrl, router, searchParams]);

	return (
		<div className={styles.table}>
			<Table
				data={tableData}
				state={{
					pagination,
					sorting,
				}}
				pageCount={data?.meta?.totalPages ?? 0}
				manualPagination={true}
				manualSorting={true}
				autoResetPageIndex={false}
				columns={[
					{
						header: t('name'),
						accessorKey: 'name',
						enableSorting: false,
						minSize: 600,
						meta: {
							style: { width: '100%' },
						},
						cell: ({ row }) => {
							const data = row.original;

							if ('isSkeleton' in data && data.isSkeleton) {
								return <LinksTableLoader />;
							}

							return <LinkCell data={data as ILink} />;
						},
					},
					{
						header: t('slug'),
						accessorKey: 'slug',
						enableSorting: false,
						minSize: 180,
						maxSize: 180,
						cell: ({ getValue }) => <SlugCell slug={getValue()} />,
					},
					{
						header: t('totalClicks'),
						accessorKey: 'totalClicks',
						minSize: 120,
						maxSize: 120,
						cell: ({ getValue }) => (
							<span
								className={styles.cell}
								style={{ paddingLeft: '8px' }}
							>
								{getValue()}
							</span>
						),
					},
					{
						header: t('uniqueClicks'),
						accessorKey: 'uniqueClicks',
						minSize: 180,
						maxSize: 180,
						cell: ({ getValue }) => (
							<span
								className={styles.cell}
								style={{ paddingLeft: '8px' }}
							>
								{getValue()}
							</span>
						),
					},
					{
						header: '',
						accessorKey: 'actions',
						maxSize: 120,
						cell: ({ cell }) => {
							const linkId = cell.row.original.id;
							return (
								<div className={styles.cell}>
									<Button
										isIcon
										isRounded
										variant="ghost"
										href={PRIVATE_PAGES.LINK(workspaceId, linkId)}
									>
										<MdOpenInNew />
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
				onPaginationChange={setPagination}
				onSortingChange={setSorting}
				getCoreRowModel={getCoreRowModel()}
			/>
			<div className={styles.footer}>
				<Pagination
					currentPage={pagination.pageIndex + 1}
					totalPages={data?.meta?.totalPages ?? 0}
					onPageChange={(page) => {
						setPagination((prev) => ({
							...prev,
							pageIndex: page - 1,
						}));
					}}
				/>
			</div>
		</div>
	);
};

export default LinksTable;
