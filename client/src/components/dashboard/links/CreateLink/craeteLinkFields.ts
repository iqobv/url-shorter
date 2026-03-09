import { CreateLinkDto } from '@/dto';
import { IFormField } from '@/types';
import { messages } from '@/types/global';
import { NestedKeyOf } from 'next-intl';

export type CreateLinkFieldName = NestedKeyOf<typeof messages.links.create>;

type CreateLinkField = IFormField<CreateLinkDto, CreateLinkFieldName>;

export const CREATE_LINK_FIELDS: CreateLinkField[] = [
	{
		name: 'originalUrl',
		label: 'fields.originalUrl.label',
		placeholder: 'fields.originalUrl.placeholder',
		type: 'text',
	},
	{
		name: 'customAlias',
		label: 'fields.customAlias.label',
		placeholder: 'fields.customAlias.placeholder',
		type: 'text',
	},
];
