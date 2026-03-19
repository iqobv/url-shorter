'use client';

import ClonedElement from '@/components/ui/ClonedElement';
import React, { memo } from 'react';
import { MdCheck } from 'react-icons/md';
import { useDropdownContext } from '../../DropdownContext';
import styles from './DropdownItem.module.scss';

interface DropdownItemProps<T> {
	children: React.ReactNode;
	value?: T;
	asChild?: boolean;
	unstyled?: boolean;
	closeOnClick?: boolean;
}

const DropdownItemInner = <T,>({
	value,
	children,
	asChild,
	unstyled = false,
	closeOnClick = true,
}: DropdownItemProps<T>) => {
	const { selectedValue, onChange, onClose } =
		useDropdownContext<T>('DropdownItem');

	const isSelected = value !== undefined && selectedValue === value;

	const handleClick = () => {
		if (value !== undefined) onChange?.(value);
		if (closeOnClick) {
			onClose();
		}
	};

	const itemClasses = unstyled
		? ''
		: `${styles['dropdown-item']} ${isSelected ? styles['dropdown-item--selected'] : ''}`;

	const contentInner = (children: React.ReactNode) => (
		<>
			<span className={styles['dropdown-item__text']}>{children}</span>
			{isSelected && (
				<MdCheck
					size={18}
					className={styles['dropdown-item__icon']}
				/>
			)}
		</>
	);

	const content = unstyled ? children : contentInner(children);

	if (asChild && React.isValidElement(children)) {
		const childProps = children.props as {
			className?: string;
			children?: React.ReactNode;
		};

		const clonedContent = unstyled
			? childProps.children
			: contentInner(childProps.children);

		return (
			<ClonedElement callback={handleClick}>
				{React.cloneElement(children, {
					className: `${childProps.className || ''} ${itemClasses}`.trim(),
					role: 'option',
					'aria-selected': isSelected,
					children: clonedContent,
				} as React.HTMLAttributes<HTMLElement>)}
			</ClonedElement>
		);
	}

	return (
		<div
			role="option"
			aria-selected={isSelected}
			onClick={handleClick}
			className={itemClasses}
		>
			{content}
		</div>
	);
};

const DropdownItem = memo(DropdownItemInner) as <T>(
	props: DropdownItemProps<T>,
) => React.JSX.Element;

export default DropdownItem;
