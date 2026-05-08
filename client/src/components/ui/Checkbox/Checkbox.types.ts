import React, { ComponentPropsWithRef } from 'react';

export interface CheckboxProps extends ComponentPropsWithRef<'input'> {
	label?: React.ReactNode;
	error?: string;
	disablePadding?: boolean;
}
