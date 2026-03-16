'use client';

import {
	flexRender,
	getCoreRowModel,
	RowData,
	TableOptions,
	useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import styles from './Table.module.scss';
import TableHeader from './TableHeader/TableHeader';

const Table = <T extends RowData>(props: TableOptions<T>) => {
	const options = useMemo(
		() => ({
			...props,
			getCoreRowModel: props.getCoreRowModel ?? getCoreRowModel(),
		}),
		[props],
	);

	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable(options);

	return (
		<table className={styles['table']}>
			<TableHeader table={table} />
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
	);
};

export default Table;
