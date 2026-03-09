'use client';

import { createContext, useContext } from 'react';

export interface DropdownContextType<T = unknown> {
	open: boolean;
	onOpen: () => void;
	onClose: () => void;
	selectedValue?: T;
	onChange?: (value: T) => void;
}

export const DropdownContext = createContext<
	DropdownContextType<unknown> | undefined
>(undefined);

export const useDropdownContext = <T,>(
	componentName: string,
): DropdownContextType<T> => {
	const context = useContext(DropdownContext);

	if (!context) {
		throw new Error(`${componentName} must be used within <Dropdown />`);
	}

	return context as DropdownContextType<T>;
};
