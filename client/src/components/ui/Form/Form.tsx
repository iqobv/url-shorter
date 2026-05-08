'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
	DefaultValues,
	FieldValues,
	FormProvider,
	useForm,
	UseFormReturn,
} from 'react-hook-form';
import { ZodType } from 'zod';
import styles from './Form.module.scss';
import FormActions from './parts/FormActions/FormActions';
import FormField from './parts/FormField/FormField';
import FormLabel from './parts/FormLabel/FormLabel';
import FormReset from './parts/FormReset/FormReset';
import FormSubmit from './parts/FormSubmit/FormSubmit';
import FormTitle from './parts/FormTitle/FormTitle';

export interface FormProps<D extends FieldValues> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	schema: ZodType<D, any, any>;
	children: React.ReactNode | ((methods: UseFormReturn<D>) => React.ReactNode);
	onSubmit?: (data: D) => void;
	defaultValues?: DefaultValues<D>;
	values?: D;
}

const Form = <D extends FieldValues = FieldValues>({
	children,
	schema,
	onSubmit,
	defaultValues,
	values,
}: FormProps<D>) => {
	const methods = useForm<D>({
		resolver: zodResolver(schema),
		defaultValues,
		values,
	});

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined}
				className={styles['form']}
			>
				{typeof children === 'function' ? children(methods) : children}
			</form>
		</FormProvider>
	);
};

Form.Title = FormTitle;
Form.Field = FormField;
Form.Label = FormLabel;
Form.Actions = FormActions;
Form.Submit = FormSubmit;
Form.Reset = FormReset;

export default Form;
