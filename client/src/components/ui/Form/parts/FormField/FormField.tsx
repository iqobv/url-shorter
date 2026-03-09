'use client';

import React, {
	ComponentPropsWithRef,
	ElementType,
	isValidElement,
} from 'react';
import {
	Controller,
	FieldValues,
	get,
	Path,
	UseControllerReturn,
	useFormContext,
} from 'react-hook-form';

type ControlledRenderFn<T extends FieldValues> = (
	props: UseControllerReturn<T, Path<T>>,
) => React.ReactNode;

type FormChild<T extends FieldValues> = React.ReactNode | ControlledRenderFn<T>;

interface FormFieldProps<T extends FieldValues> {
	name: Path<T> | string;
	children: FormChild<T>;
	isController?: boolean;
}

const FormField = <T extends FieldValues>({
	name,
	children,
	isController = false,
}: FormFieldProps<T>) => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<T>();

	const error = get(errors, name);

	const renderChildren = (child: FormChild<T>): React.ReactNode => {
		if (typeof child === 'function') {
			return (
				<Controller
					name={name as Path<T>}
					control={control}
					render={(props) =>
						(child as ControlledRenderFn<T>)(props) as React.ReactElement
					}
				/>
			);
		}

		return React.Children.map(child, (item) => {
			if (!isValidElement(item)) return item;

			const itemType = item.type as ElementType;

			const isLabel =
				item.type === 'label' ||
				(typeof itemType !== 'string' &&
					'displayName' in itemType &&
					itemType.displayName === 'FormLabel');

			if (isLabel) return item;

			const { ref, ...registerProps } = register(name as Path<T>);

			if (isController) {
				return (
					<Controller
						name={name as Path<T>}
						control={control}
						render={({ field }) =>
							React.cloneElement(
								item as React.ReactElement<ComponentPropsWithRef<ElementType>>,
								{ ...field },
							)
						}
					/>
				);
			}

			return React.cloneElement(
				item as React.ReactElement<ComponentPropsWithRef<ElementType>>,
				{
					...registerProps,
					ref: ref,
					error: error?.message,
				},
			);
		});
	};

	return <div className="form-field">{renderChildren(children)}</div>;
};

export default FormField;
