'use client';

import { flexRender } from '@tanstack/react-table';
import { useTableContext } from '../TableContext';

const TableBody = () => {
	const { table } = useTableContext();

	return (
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
	);
};

export default TableBody;
