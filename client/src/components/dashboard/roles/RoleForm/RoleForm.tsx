'use client';

import { Form, Input } from '@/components/ui';
import { PERMISSIONS } from '@/constants';
import { CreateRoleDto } from '@/dto';
import { messages, useRouter } from '@/i18n';
import { Permissions } from '@/types';
import { useMemo } from 'react';
import { DefaultValues, FieldValues, Path } from 'react-hook-form';
import { NestedKeyOf, useTranslations } from 'use-intl';
import { ZodType } from 'zod';
import PermissionGroup from './PermissionGroup/PermissionGroup';
import styles from './RoleForn.module.scss';

type GroupMessages = NestedKeyOf<typeof messages.role.groups>;
type ActionMessages = NestedKeyOf<typeof messages.role.form>;

export interface PermissionsGroup {
	name: GroupMessages;
	permissions: Permissions[];
}

export interface ActionTranslationKeys {
	submit: ActionMessages;
	cancel: ActionMessages;
}

interface RoleFormProps<T extends FieldValues> {
	schema: ZodType<T>;
	onSubmit: (data: T) => void;
	actionTranslationKeys: ActionTranslationKeys;
	defaultValues?: DefaultValues<T>;
	showActionOnDirty?: boolean;
}

const RoleForm = <T extends FieldValues>({
	schema,
	onSubmit,
	actionTranslationKeys,
	defaultValues,
	showActionOnDirty,
}: RoleFormProps<T>) => {
	const t = useTranslations('role.form');
	const router = useRouter();

	const groups: PermissionsGroup[] = useMemo(() => {
		return Object.entries(PERMISSIONS).map(([name, permissions]) => ({
			name: name as GroupMessages,
			permissions: Object.values(permissions),
		}));
	}, []);

	return (
		<Form<T> schema={schema} onSubmit={onSubmit} defaultValues={defaultValues}>
			{({ watch, setValue, formState: { isDirty } }) => {
				const selectedPermissions = watch('permissions' as Path<T>);

				const handleCheckboxChange = (permission: Permissions[number]) => {
					const updatedPermissions = selectedPermissions.includes(permission)
						? selectedPermissions.filter(
								(p: Permissions[number]) => p !== permission,
							)
						: [...selectedPermissions, permission];

					setValue('permissions' as Path<T>, updatedPermissions, {
						shouldValidate: true,
						shouldDirty: true,
					});
				};

				return (
					<>
						<Form.Field<CreateRoleDto> name="name" namespace="role.form.fields">
							<Input
								label={t('fields.name.label')}
								placeholder={t('fields.name.placeholder')}
							/>
						</Form.Field>
						<p>{t('selectPermissions')}</p>
						{groups.map((group, index) => (
							<PermissionGroup
								key={index}
								group={group}
								handleCheckboxChange={handleCheckboxChange}
								selectedPermissions={selectedPermissions}
							/>
						))}
						{(!showActionOnDirty || isDirty) && (
							<Form.Actions
								className={`${styles['form-actions']} ${showActionOnDirty && isDirty ? styles['show-actions--active'] : ''}`}
							>
								<Form.Reset
									buttonProps={{
										variant: 'ghost',
										onClick: () => router.back(),
									}}
								>
									{t(actionTranslationKeys.cancel as never)}
								</Form.Reset>
								<Form.Submit>
									{t(actionTranslationKeys.submit as never)}
								</Form.Submit>
							</Form.Actions>
						)}
					</>
				);
			}}
		</Form>
	);
};

export default RoleForm;
