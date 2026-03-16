'use client';

import { useZodErrorMap } from '@/hooks';
import { TMessages } from '@/types';
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
	name: Path<T>;
	children: FormChild<T>;
	isController?: boolean;
	namespace?: TMessages;
}

const FormField = <T extends FieldValues>({
	name,
	children,
	isController = false,
	namespace,
}: FormFieldProps<T>) => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<T>();

	const getErrorMessage = useZodErrorMap(namespace);
	const error = get(errors, name);

	const renderChildren = (child: FormChild<T>): React.ReactNode => {
		if (typeof child === 'function') {
			return (
				<Controller
					name={name}
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

			const { ref, ...registerProps } = register(name);
			const translatedError = getErrorMessage(error);

			if (isController) {
				return (
					<Controller
						name={name}
						control={control}
						render={({ field }) =>
							React.cloneElement(
								item as React.ReactElement<ComponentPropsWithRef<ElementType>>,
								{ ...field, error: translatedError },
							)
						}
					/>
				);
			}

			return React.cloneElement(
				item as React.ReactElement<ComponentPropsWithRef<ElementType>>,
				{
					...registerProps,
					ref,
					error: translatedError,
				},
			);
		});
	};

	return <div className="form-field">{renderChildren(children)}</div>;
};

export default FormField;
