'use client';

import Button from '@/components/ui/Button/Button';
import { NativeButtonProps } from '@/components/ui/Button/Button.types';

export type FormSubmitButtonProps = Omit<
	NativeButtonProps,
	'type' | 'href' | 'children'
>;

interface FormSubmitProps {
	children: React.ReactNode;
	buttonProps?: FormSubmitButtonProps;
}

const FormSubmit = ({ children, buttonProps }: FormSubmitProps) => {
	return (
		<Button
			type="submit"
			{...buttonProps}
		>
			{children}
		</Button>
	);
};

export default FormSubmit;
