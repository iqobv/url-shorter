import { LoginDto } from '@/dto';
import { IFormField } from '@/types';
import { messages } from '@/types/global';
import { NestedKeyOf } from 'next-intl';
import { MdKey, MdOutlineEmail } from 'react-icons/md';

export type LoginFieldMessage = NestedKeyOf<typeof messages.auth>;

export const LOGIN_FIELDS: IFormField<LoginDto, LoginFieldMessage>[] = [
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
