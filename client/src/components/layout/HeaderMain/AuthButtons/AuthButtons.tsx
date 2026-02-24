'use client';

import { Button } from '@/components/ui';
import { PAGES } from '@/config';
import { useTranslations } from 'next-intl';
import styles from './AuthButtons.module.scss';

const AuthButtons = () => {
	const t = useTranslations('Header.Public');

	return (
		<div className={styles['auth-buttons']}>
			<Button href={PAGES.LOGIN} variant="ghost">
				{t('login')}
			</Button>
			<Button href={PAGES.REGISTER}>{t('register')}</Button>
		</div>
	);
};

export default AuthButtons;
