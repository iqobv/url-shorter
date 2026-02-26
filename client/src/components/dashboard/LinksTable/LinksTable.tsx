'use client';

import { getAllLinks } from '@/api';
import { Pagination } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { useGetUser } from '@/stores';
import { useQuery } from '@tanstack/react-query';
import {
	flexRender,
	getCoreRowModel,
	PaginationState,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const LinksTable = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const user = useGetUser();
	const t = useTranslations('Dashboard.columns');
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
		queryKey: QUERY_KEYS.LINK.ALL(user?.id || '', pagination, sorting),
		queryFn: () => {
			const sortState = sorting[0];

			return getAllLinks({
				page: pagination.pageIndex + 1,
				limit: pagination.pageSize,
				sortBy: sortState ? sortState.id : 'createdAt',
				sortOrder: sortState ? (sortState.desc ? 'desc' : 'asc') : 'desc',
			});
		},
		enabled: !!user,
	});

	useEffect(() => {
		if (data && data.meta.totalPages < pageFromUrl) {
			setPagination((prev) => ({
				...prev,
				pageIndex: data.meta.totalPages - 1,
			}));
			const newSearchParams = new URLSearchParams(searchParams.toString());
			newSearchParams.set('page', data.meta.totalPages.toString());
			router.push(`?${newSearchParams.toString()}`, { scroll: false });
		}
	}, [data, pageFromUrl, router, searchParams]);

	const table = useReactTable({
		data: data?.items || [],
		state: {
			pagination,
			sorting,
		},
		pageCount: data?.meta?.totalPages ?? 0,
		manualPagination: true,
		manualSorting: true,
		autoResetPageIndex: false,
		columns: [
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
		],
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div>
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id}>
									<div
										style={{
											cursor: header.column.getCanSort()
												? 'pointer'
												: 'default',
										}}
										onClick={header.column.getToggleSortingHandler()}
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
										{{
											asc: ' 🔼',
											desc: ' 🔽',
										}[header.column.getIsSorted() as string] ?? null}
									</div>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<Pagination
				totalPages={table.getPageCount()}
				currentPage={table.getState().pagination.pageIndex + 1}
				onPageChange={(page) => {
					table.setPageIndex(page - 1);
					router.push(`?page=${page}`, { scroll: false });
				}}
			/>
		</div>
	);
};

export default LinksTable;
