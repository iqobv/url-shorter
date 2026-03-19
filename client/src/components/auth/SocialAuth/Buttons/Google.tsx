'use client';

import { PRIVATE_PAGES } from '@/config';
import { useTranslations } from 'next-intl';
import { FcGoogle } from 'react-icons/fc';
import SocialButton from '../SocialButton/SocialButton';

const Google = () => {
	const t = useTranslations('auth.provider');

	const onClick = () => {
		const returnTo = PRIVATE_PAGES.DASHBOARD;
		const apiUrl = process.env.NEXT_PUBLIC_API_URL;

		window.location.href = `${apiUrl}/v1/oauth/google?returnTo=${encodeURIComponent(returnTo)}`;
	};

	return (
		<SocialButton
			onClick={onClick}
			icon={FcGoogle}
			text={t('google')}
		/>
	);
};

export default Google;
