import { ComponentPropsWithRef } from 'react';

export interface InputProps extends Omit<
	ComponentPropsWithRef<'input'>,
	'className'
> {
	label?: string;
	error?: string;
	leftSection?: React.ReactNode;
	rightSection?: React.ReactNode;
	inputClassName?: string;
	containerClassName?: string;
}
