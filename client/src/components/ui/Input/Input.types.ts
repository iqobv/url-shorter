import { ComponentPropsWithRef } from 'react';

export interface InputProps extends ComponentPropsWithRef<'input'> {
	label?: string;
	error?: string;
	leftSection?: React.ReactNode;
	rightSection?: React.ReactNode;
}
