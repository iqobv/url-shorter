'use client';

import { BackButton, Checkbox, Input, PageTitle } from '@/components/ui';
import Form, { FormProps } from '@/components/ui/Form/Form';
import { IFormField } from '@/types';
import { useTranslations } from 'next-intl';
import { FieldValues } from 'react-hook-form';
import styles from './WorkspaceForm.module.scss';

interface WorkspaceFormProps<D extends FieldValues> extends Omit<
	FormProps<D>,
	'children'
> {
	fields: IFormField<D, string>[];
	isLoading?: boolean;
}

const WorkspaceForm = <D extends FieldValues = FieldValues>({
	fields,
	schema,
	defaultValues,
	onSubmit,
	isLoading = false,
}: WorkspaceFormProps<D>) => {
	const t = useTranslations();

	return (
		<div className={styles.form}>
			<BackButton />
			<PageTitle
				title={t('workspaces.create.title')}
				description={t('workspaces.create.description')}
				titleComponent="h1"
			/>
			<Form<D>
				schema={schema}
				defaultValues={defaultValues}
				onSubmit={onSubmit}
			>
				{fields.map((field) => (
					<Form.Field
						key={field.name}
						name={field.name}
					>
						{field.type === 'checkbox' ? (
							<Checkbox label={t(field.label as never)} />
						) : (
							<Input
								placeholder={
									field.placeholder ? t(field.placeholder as never) : undefined
								}
								label={t(field.label as never)}
								required={field.required}
								type={field.type}
								autoComplete={field.autoComplete}
							/>
						)}
					</Form.Field>
				))}
				<Form.Actions>
					<Form.Submit buttonProps={{ isLoading }}>
						{t('workspaces.fields.submit')}
					</Form.Submit>
				</Form.Actions>
			</Form>
		</div>
	);
};

export default WorkspaceForm;
