'use client';

import { Button } from '@/components/ui';
import { PUBLIC_PAGES } from '@/config';
import { useTranslations } from 'next-intl';
import styles from './AuthButtons.module.scss';

const AuthButtons = () => {
	const t = useTranslations('header.public');

	return (
		<div className={styles.buttons}>
			<Button
				href={PUBLIC_PAGES.LOGIN}
				variant="ghost"
			>
				{t('login')}
			</Button>
			<Button href={PUBLIC_PAGES.REGISTER}>{t('register')}</Button>
		</div>
	);
};

export default AuthButtons;
