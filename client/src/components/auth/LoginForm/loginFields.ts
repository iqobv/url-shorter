import { LoginDto } from '@/dto';
import { IFormField } from '@/types';
import { MdKey, MdOutlineEmail } from 'react-icons/md';

export const LOGIN_FIELDS: IFormField<LoginDto>[] = [
	{
		name: 'email',
		label: 'login.fields.email.label',
		placeholder: 'login.fields.email.placeholder',
		type: 'email',
		icon: MdOutlineEmail,
	},
	{
		name: 'password',
		label: 'login.fields.password.label',
		placeholder: 'login.fields.password.placeholder',
		type: 'password',
		icon: MdKey,
	},
];
