import { RegisterDto } from '@/dto';
import { IFormField } from '@/types';
import { MdKey, MdOutlineEmail } from 'react-icons/md';

export const REGISTER_FORM_FIELDS: IFormField<RegisterDto>[] = [
	{
		name: 'email',
		label: 'Register.fields.email.label',
		placeholder: 'Register.fields.email.placeholder',
		type: 'text',
		autoComplete: 'email',
		icon: MdOutlineEmail,
	},
	{
		name: 'password',
		label: 'Register.fields.password.label',
		placeholder: 'Register.fields.password.placeholder',
		type: 'password',
		autoComplete: 'new-password',
		icon: MdKey,
	},
	{
		name: 'confirmPassword',
		label: 'Register.fields.confirmPassword.label',
		placeholder: 'Register.fields.confirmPassword.placeholder',
		type: 'password',
		autoComplete: 'off',
		icon: MdKey,
	},
];
