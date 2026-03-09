'use client';

import { UseFloatingReturn } from '@floating-ui/react';
import { createContext, useContext } from 'react';

export interface DropdownPositionContextType {
	refs: UseFloatingReturn['refs'];
	floatingStyles: UseFloatingReturn['floatingStyles'];
	triggerWidth?: number;
}
export const DropdownPositionContext = createContext<
	DropdownPositionContextType | undefined
>(undefined);

export const useDropdownPositionContext = (componentName: string) => {
	const context = useContext(DropdownPositionContext);

	if (!context) {
		throw new Error(`${componentName} must be used within <Dropdown />`);
	}

	return context;
};
