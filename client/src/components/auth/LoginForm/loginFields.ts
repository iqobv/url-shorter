import { LoginDto } from '@/dto';
import { IFormField } from '@/types';
import { MdKey, MdOutlineEmail } from 'react-icons/md';

export const LOGIN_FIELDS: IFormField<LoginDto>[] = [
	{
		name: 'email',
		label: 'Login.fields.email.label',
		placeholder: 'Login.fields.email.placeholder',
		type: 'email',
		icon: MdOutlineEmail,
	},
	{
		name: 'password',
		label: 'Login.fields.password.label',
		placeholder: 'Login.fields.password.placeholder',
		type: 'password',
		icon: MdKey,
	},
];
