import { CreateWorkspaceDto } from '@/dto';
import { IFormField, TMessages } from '@/types';

export const CREATE_WORKSPACE_FIELDS: IFormField<
	CreateWorkspaceDto,
	TMessages
>[] = [
	{
		name: 'name',
		label: 'workspaces.fields.name.label',
		placeholder: 'workspaces.fields.name.placeholder',
		type: 'text',
		autoComplete: 'name',
		required: true,
	},
	{
		name: 'isPersonal',
		label: 'workspaces.fields.isPersonal.label',
		type: 'checkbox',
	},
	{
		name: 'isDefault',
		label: 'workspaces.fields.isDefault.label',
		type: 'checkbox',
	},
];
