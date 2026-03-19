'use client';

import Button from '@/components/ui/Button/Button';
import { useFormContext } from 'react-hook-form';
import { FormSubmitButtonProps } from '../FormSubmit/FormSubmit';

interface FormResetProps {
	children: React.ReactNode;
	buttonProps?: FormSubmitButtonProps;
}

const FormReset = ({ children, buttonProps }: FormResetProps) => {
	const { reset } = useFormContext();
	const { onClick: buttonPropsOnClick, ...rest } = buttonProps || {};

	const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		reset();
		if (buttonPropsOnClick) buttonPropsOnClick(e);
	};

	return (
		<Button
			type="button"
			onClick={onClick}
			{...rest}
		>
			{children}
		</Button>
	);
};

export default FormReset;
