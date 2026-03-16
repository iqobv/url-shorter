'use client';

import { getWorkspaceLinks } from '@/api';
import { Table } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { useWorkspaceId } from '@/hooks';
import { useRouter } from '@/i18n';
import { useGetUser } from '@/stores';
import { useQuery } from '@tanstack/react-query';
import {
	getCoreRowModel,
	PaginationState,
	SortingState,
} from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const LinksTable = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const workspaceId = useWorkspaceId();

	const user = useGetUser();
	const t = useTranslations('dashboard.columns');
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

	const { data } = useQuery({
		queryKey: QUERY_KEYS.LINK.ALL(
			user?.id || '',
			workspaceId,
			pagination,
			sorting,
		),
		queryFn: () => {
			const sortState = sorting[0];

			return getWorkspaceLinks(workspaceId, {
				page: pagination.pageIndex >= 0 ? pagination.pageIndex + 1 : 1,
				limit: pagination.pageSize,
				sortBy: sortState ? sortState.id : 'createdAt',
				sortOrder: sortState ? (sortState.desc ? 'desc' : 'asc') : 'desc',
			});
		},
		enabled: !!user,
	});

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
		<div>
			<Table
				data={data?.items || []}
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
						header: t('slug'),
						accessorKey: 'slug',
						enableSorting: false,
					},
					{
						header: t('totalClicks'),
						accessorKey: 'totalClicks',
					},
					{
						header: t('uniqueClicks'),
						accessorKey: 'uniqueClicks',
					},
				]}
				onPaginationChange={setPagination}
				onSortingChange={setSorting}
				getCoreRowModel={getCoreRowModel()}
			/>
		</div>
	);
};

export default LinksTable;
