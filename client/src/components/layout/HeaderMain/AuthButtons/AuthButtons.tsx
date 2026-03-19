'use client';

import { Button } from '@/components/ui';
import { PRIVATE_PAGES, PUBLIC_PAGES } from '@/config';
import { useGetUser } from '@/stores';
import { useTranslations } from 'next-intl';
import styles from './AuthButtons.module.scss';

const AuthButtons = () => {
	const user = useGetUser();
	const isAuthenticated = !!user;

	const t = useTranslations('header.public');

	return (
		<div className={styles['auth-buttons']}>
			{isAuthenticated ? (
				<Button
					href={PRIVATE_PAGES.DASHBOARD}
					variant="primary"
				>
					{t('dashboardButton')}
				</Button>
			) : (
				<>
					<Button
						href={PUBLIC_PAGES.LOGIN}
						variant="ghost"
					>
						{t('login')}
					</Button>
					<Button href={PUBLIC_PAGES.REGISTER}>{t('register')}</Button>
				</>
			)}
		</div>
	);
};

export default AuthButtons;
