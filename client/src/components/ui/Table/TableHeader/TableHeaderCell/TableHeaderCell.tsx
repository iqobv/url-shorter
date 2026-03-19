'use client';

import { ColumnMeta, flexRender, Header } from '@tanstack/react-table';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import styles from './TableHeaderCell.module.scss';

interface TableHeaderCellMeta extends ColumnMeta<unknown, unknown> {
	expand?: boolean;
}

interface TableHeaderCell<T> {
	header: Header<T, unknown>;
}

const TableHeaderCell = <T,>({ header }: TableHeaderCell<T>) => {
	const meta = header.column.columnDef.meta as TableHeaderCellMeta | undefined;
	const cellClassName = `${styles['table-header-cell']} ${meta?.expand ? styles['table-header-cell--expanded'] : ''}`;

	const innerClassName = `${styles['table-header-cell__inner']} ${header.column.getCanSort() ? styles['table-header-cell__inner--sortable'] : ''}`;

	return (
		<th
			colSpan={header.colSpan}
			className={cellClassName.trim()}
		>
			<div
				onClick={header.column.getToggleSortingHandler()}
				className={innerClassName.trim()}
			>
				<p>{flexRender(header.column.columnDef.header, header.getContext())}</p>
				{header.column.getIsSorted() === 'asc' ? <TiArrowSortedUp /> : null}
				{header.column.getIsSorted() === 'desc' ? <TiArrowSortedDown /> : null}
			</div>
		</th>
	);
};

export default TableHeaderCell;
