'use client';

import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import Button from '../Button/Button';
import styles from './Pagination.module.scss';
import { getPageNumbers } from './utills/getPageNumbers.util';

interface PaginationProps {
	totalPages: number;
	currentPage: number;
	onPageChange: (page: number) => void;
}

const Pagination = ({
	totalPages,
	currentPage,
	onPageChange,
}: PaginationProps) => {
	const pages = getPageNumbers(currentPage, totalPages);

	return (
		<div className={styles['pagination']}>
			<Button
				isIcon
				onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				variant="ghost"
			>
				<MdArrowBackIosNew />
			</Button>
			{pages.map((page, index) => (
				<Button
					key={index}
					onClick={() => typeof page === 'number' && onPageChange(Number(page))}
					disabled={page === '...'}
					variant={
						page === currentPage
							? 'primary'
							: page === '...'
								? 'ghost'
								: 'secondary'
					}
				>
					{page}
				</Button>
			))}
			<Button
				isIcon
				onClick={() =>
					currentPage < totalPages && onPageChange(currentPage + 1)
				}
				disabled={currentPage === totalPages}
				variant="ghost"
			>
				<MdArrowForwardIos />
			</Button>
		</div>
	);
};

export default Pagination;
