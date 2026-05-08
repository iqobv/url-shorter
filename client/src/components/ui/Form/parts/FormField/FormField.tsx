'use client';

import { useTranslations } from 'next-intl';
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

	const t = useTranslations();
	const error = get(errors, name);
	const errorMessage = error?.message as string | undefined;

	const translatedError = errorMessage
		? t(errorMessage as Parameters<typeof t>[0])
		: undefined;

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

			if (item.type === React.Fragment) {
				return renderChildren(
					(item as React.ReactElement<{ children?: React.ReactNode }>).props
						.children as React.ReactNode,
				);
			}

			const itemType = item.type;
			const isLabel =
				itemType === 'label' ||
				((typeof itemType === 'function' ||
					(typeof itemType === 'object' && itemType !== null)) &&
					'displayName' in itemType &&
					(itemType as { displayName?: string }).displayName === 'FormLabel');

			if (isLabel) return item;

			const { ref, ...registerProps } = register(name);
			const existingError = (item.props as { error?: string }).error;
			const finalError = existingError || translatedError;

			if (isController) {
				return (
					<Controller
						name={name}
						control={control}
						render={({ field }) =>
							React.cloneElement(
								item as React.ReactElement<ComponentPropsWithRef<ElementType>>,
								{ ...field, error: finalError },
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
					error: finalError,
				},
			);
		});
	};

	return <div className="form-field">{renderChildren(children)}</div>;
};

export default FormField;
