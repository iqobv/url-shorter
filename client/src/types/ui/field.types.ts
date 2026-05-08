import { ComponentProps } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { IconType } from 'react-icons';

export interface Field<D extends FieldValues = FieldValues> {
	name: Path<D>;
	label: string;
	type?: ComponentProps<'input'>['type'];
	icon?: IconType | React.ReactNode;
	placeholder?: string;
	autoComplete?: ComponentProps<'input'>['autoComplete'];
	required?: boolean;
}
