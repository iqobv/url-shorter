import { FieldValues, Path } from 'react-hook-form';
import { IconType } from 'react-icons';

export interface IFormField<T extends FieldValues, M extends string> {
	name: Path<T>;
	label: M;
	placeholder?: M;
	type: React.HTMLInputTypeAttribute;
	autoComplete?: React.HTMLInputAutoCompleteAttribute;
	icon?: IconType;
	required?: boolean;
}
