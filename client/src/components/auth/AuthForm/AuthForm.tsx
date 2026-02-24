'use client';

import { Button, Input } from '@/components/ui';
import { BaseAuthErrorKeys } from '@/schemas';
import { IApiErrorResponse, IFormField } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ZodType } from 'zod';
import styles from './AuthForm.module.scss';

interface AuthFormProps<T extends FieldValues, R> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	schema: ZodType<T, any, any>;
	fields: IFormField<T>[];
	mutatationFn: (dto: T) => Promise<R>;
	mutationKey: string[];
	buttonText?: string;
	onSuccess?: (data: R) => void;
	bottomNode?: React.ReactNode;
}

const AuthForm = <T extends FieldValues, R>({
	schema,
	fields,
	mutatationFn,
	mutationKey,
	buttonText = 'Submit',
	onSuccess,
	bottomNode,
}: AuthFormProps<T, R>) => {
	const formT = useTranslations('Form.errors');
	const authT = useTranslations('Auth');
	const apiT = useTranslations('ApiResponse');

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<T>({
		resolver: zodResolver(schema),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (data: T) => mutatationFn(data),
		mutationKey,
		onError: (error: IApiErrorResponse) => {
			const code = error.code || 'SERVER_ERROR';
			const codeText = apiT(code as never);
			toast.error(codeText);
			setError('root', { message: codeText });
		},
		onSuccess: (data) => {
			onSuccess?.(data);
		},
	});

	const onSubmit = (data: T) => {
		mutate(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles['auth-form']}>
			{errors.root && <p>{errors.root.message}</p>}
			{fields.map((field) => (
				<Input
					key={field.name}
					placeholder={authT(field.placeholder as never)}
					label={authT(field.label as never)}
					type={field.type}
					leftSection={field.icon ? <field.icon size={20} /> : undefined}
					autoComplete={field.autoComplete}
					error={
						errors[field.name]?.message
							? formT(errors[field.name]?.message as BaseAuthErrorKeys)
							: ''
					}
					{...register(field.name)}
				/>
			))}
			<Button type="submit" fullWidth isLoading={isPending}>
				{buttonText}
			</Button>
			{bottomNode}
		</form>
	);
};

export default AuthForm;
