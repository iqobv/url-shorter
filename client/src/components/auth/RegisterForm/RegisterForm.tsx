'use client';

import { register } from '@/api';
import { PAGES, QUERY_KEYS } from '@/config';
import { RegisterDto } from '@/dto';
import { registerSchema } from '@/schemas';
import { ICodeResponse } from '@/types';
import { useTranslations } from 'next-intl';
import AuthForm from '../AuthForm/AuthForm';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import BottomText from '../BottomText/BottomText';
import { REGISTER_FORM_FIELDS } from './RegisterFormFields';

const RegisterForm = () => {
	const t = useTranslations('Auth.Register');
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
				/>
			}
			bottomNode={
				<BottomText
					text={t('bottomText')}
					href={PAGES.LOGIN}
					linkText={t('bottomLink')}
				/>
			}
		/>
	);
};

export default RegisterForm;
