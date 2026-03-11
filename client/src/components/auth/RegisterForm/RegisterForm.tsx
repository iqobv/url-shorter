'use client';

import { register } from '@/api';
import { PUBLIC_PAGES, QUERY_KEYS } from '@/config';
import { RegisterDto } from '@/dto';
import { registerSchema } from '@/schemas';
import { ICodeResponse } from '@/types';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n';
import AuthForm from '../AuthForm/AuthForm';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import BottomText from '../BottomText/BottomText';
import { REGISTER_FORM_FIELDS } from './RegisterFormFields';

const RegisterForm = () => {
	const router = useRouter();
	const t = useTranslations('auth.register');

	return (
		<AuthWrapper
			title={t('title')}
			form={
				<AuthForm<RegisterDto, ICodeResponse>
					fields={REGISTER_FORM_FIELDS}
					schema={registerSchema}
					mutatationFn={(dto) => register(dto)}
					mutationKey={QUERY_KEYS.AUTH.REGISTER}
					buttonText={t('submit')}
					onSuccess={() => {
						router.push(PUBLIC_PAGES.EMAIL_VERIFY);
					}}
				/>
			}
			bottomNode={
				<BottomText
					text={t('bottomText')}
					href={PUBLIC_PAGES.LOGIN}
					linkText={t('bottomLink')}
				/>
			}
		/>
	);
};

export default RegisterForm;
