'use client';

import { login } from '@/api';
import { Button } from '@/components/ui';
import { PRIVATE_PAGES, PUBLIC_PAGES, QUERY_KEYS } from '@/config';
import { LoginDto } from '@/dto';
import { baseAuthSchema } from '@/schemas';
import { IUser } from '@/types';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import AuthForm from '../AuthForm/AuthForm';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import BottomText from '../BottomText/BottomText';
import { LOGIN_FIELDS } from './loginFields';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
	const router = useRouter();

	const t = useTranslations('auth.login');

	return (
		<AuthWrapper
			title={t('title')}
			form={
				<AuthForm<LoginDto, IUser>
					fields={LOGIN_FIELDS}
					mutatationFn={(dto) => login(dto)}
					mutationKey={QUERY_KEYS.AUTH.LOGIN}
					schema={baseAuthSchema}
					buttonText={t('submit')}
					onSuccess={() => {
						router.refresh();
						router.push(PRIVATE_PAGES.DASHBOARD);
					}}
					bottomNode={
						<Button
							variant="link"
							href={PUBLIC_PAGES.FORGOT_PASSWORD}
							className={styles['forgot-password-link']}
						>
							{t('forgotPassword')}
						</Button>
					}
				/>
			}
			bottomNode={
				<div className={styles['bottom-node']}>
					<BottomText
						text={t('bottomText')}
						linkText={t('bottomLink')}
						href={PUBLIC_PAGES.REGISTER}
					/>
				</div>
			}
		/>
	);
};

export default LoginForm;
