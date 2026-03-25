'use client';

import { Link } from '@/i18n';
import { ILink } from '@/types';
import { getFavicon } from '@/utils';
import Image from 'next/image';
import styles from './LinkCell.module.scss';

interface LinkCellProps {
	data: ILink;
}

const LinkCell = ({ data }: LinkCellProps) => {
	return (
		<div className={styles['link-cell']}>
			<div className={styles['link-cell__content']}>
				<Image
					src={getFavicon(data.domain, 24)}
					width={24}
					height={24}
					alt={data.domain}
				/>
				<div className={styles['link-cell__text']}>
					<Link
						href={data.originalUrl}
						target="_blank"
						rel="noopener noreferrer"
						className={styles['link-cell__link']}
					>
						{data.title || data.domain}
					</Link>
					<p className={styles['link-cell__site-name']}>{data.siteName}</p>
				</div>
			</div>
		</div>
	);
};

export default LinkCell;
