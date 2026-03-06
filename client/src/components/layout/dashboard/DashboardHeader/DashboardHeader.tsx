'use client';

import { Input } from '@/components/ui';
import { useTranslations } from 'next-intl';
import { MdOutlineSearch } from 'react-icons/md';
import styles from './DashboardHeader.module.scss';

const DashboardHeader = () => {
	const t = useTranslations('header.dashboard');

	return (
		<header className={styles['dashboard-header']}>
			<div className={styles['dashboard-header__container']}>
				<div className={styles['dashboard-header__search-container']}>
					<Input
						leftSection={<MdOutlineSearch size={20} />}
						placeholder={t('search.placeholder')}
					/>
				</div>
			</div>
		</header>
	);
};

export default DashboardHeader;
