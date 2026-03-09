'use client';

import { Input } from '@/components/ui';
import { useWorkspaceId } from '@/hooks';
import { useTranslations } from 'next-intl';
import { MdOutlineSearch } from 'react-icons/md';
import styles from './DashboardHeader.module.scss';
import DashboardHeaderCreateLink from './DashboardHeaderCreateLink/DashboardHeaderCreateLink';

const DashboardHeader = () => {
	const workspaceId = useWorkspaceId();

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
				<DashboardHeaderCreateLink
					label={t('newButton')}
					workspaceId={workspaceId}
				/>
			</div>
		</header>
	);
};

export default DashboardHeader;
