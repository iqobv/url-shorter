'use client';

import { Input } from '@/components/ui';
import { useTranslations } from 'next-intl';
import React from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import styles from './DashboardHeader.module.scss';

interface DashboardHeaderProps {
	children: React.ReactNode;
}

const DashboardHeader = ({ children }: DashboardHeaderProps) => {
	const t = useTranslations('header.dashboard');

	return (
		<header className={styles['dashboard-header']}>
			<div className={styles['dashboard-header__container']}>
				<div />
				<div className={styles['dashboard-header__search-container']}>
					<Input
						leftSection={<MdOutlineSearch size={20} />}
						placeholder={t('search.placeholder')}
					/>
				</div>
				<div>{children}</div>
			</div>
		</header>
	);
};

export default DashboardHeader;
