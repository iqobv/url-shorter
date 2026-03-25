'use client';

import { Button } from '@/components/ui';
import { useTranslations } from 'next-intl';
import { MdCopyAll } from 'react-icons/md';
import { toast } from 'react-toastify';
import styles from './SlugCell.module.scss';

interface SlugCellProps {
	slug: string;
}

const SlugCell = ({ slug }: SlugCellProps) => {
	const t = useTranslations('links');

	const handleClick = () => {
		navigator.clipboard.writeText(
			`${process.env.NEXT_PUBLIC_SHORT_URL}/${slug}`,
		);
		toast.success(t('copied'));
	};

	return (
		<div className={`${styles['slug-cell']}`}>
			<span>{slug}</span>
			<Button
				variant="ghost"
				isIcon
				isRounded
				className={styles['copy-button']}
				onClick={handleClick}
			>
				<MdCopyAll />
			</Button>
		</div>
	);
};

export default SlugCell;
