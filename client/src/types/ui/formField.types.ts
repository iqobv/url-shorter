import { FieldValues, Path } from 'react-hook-form';
import { IconType } from 'react-icons';

export interface IFormField<T extends FieldValues> {
	name: Path<T>;
	label: string;
	placeholder?: string;
	type: React.HTMLInputTypeAttribute;
	autoComplete?: React.HTMLInputAutoCompleteAttribute;
	icon?: IconType;
}
