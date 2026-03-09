import { RegisterDto } from '@/dto';
import { IFormField } from '@/types';
import { messages } from '@/types/global';
import { NestedKeyOf } from 'next-intl';
import { MdKey, MdOutlineEmail, MdPersonOutline } from 'react-icons/md';

export type RegisterFieldMessage = NestedKeyOf<typeof messages.auth>;

export const REGISTER_FORM_FIELDS: IFormField<
	RegisterDto,
	RegisterFieldMessage
>[] = [
	{
		name: 'email',
		label: 'register.fields.email.label',
		placeholder: 'register.fields.email.placeholder',
		type: 'text',
		autoComplete: 'email',
		icon: MdOutlineEmail,
	},
	{
		name: 'password',
		label: 'register.fields.password.label',
		placeholder: 'register.fields.password.placeholder',
		type: 'password',
		autoComplete: 'new-password',
		icon: MdKey,
	},
	{
		name: 'confirmPassword',
		label: 'register.fields.confirmPassword.label',
		placeholder: 'register.fields.confirmPassword.placeholder',
		type: 'password',
		autoComplete: 'off',
		icon: MdKey,
	},
	{
		name: 'username',
		label: 'register.fields.username.label',
		placeholder: 'register.fields.username.placeholder',
		type: 'text',
		autoComplete: 'username',
		icon: MdPersonOutline,
	},
];
