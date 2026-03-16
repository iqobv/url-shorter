'use client';

import { Table } from '@tanstack/react-table';
import styles from './TableHeader.module.scss';
import TableHeaderCell from './TableHeaderCell/TableHeaderCell';

interface TableHeaderProps<T> {
	table: Table<T>;
}

const TableHeader = <T,>({ table }: TableHeaderProps<T>) => {
	return (
		<thead className={styles['table-header']}>
			{table.getHeaderGroups().map((headerGroup) => (
				<tr key={headerGroup.id} className={styles['table-header__row']}>
					{headerGroup.headers.map((header) => (
						<TableHeaderCell key={header.id} header={header} />
					))}
				</tr>
			))}
		</thead>
	);
};

export default TableHeader;
