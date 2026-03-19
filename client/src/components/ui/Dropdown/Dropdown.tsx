'use client';

import {
	autoUpdate,
	flip,
	offset,
	shift,
	useFloating,
} from '@floating-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { DropdownContext, DropdownContextType } from './DropdownContext';
import {
	DropdownPositionContext,
	DropdownPositionContextType,
} from './DropdownPositionContext';
import DropdownDivider from './parts/DropdownDivider/DropdownDivider';
import DropdownGroup from './parts/DropdownGroup/DropdownGroup';
import DropdownItem from './parts/DropdownItem/DropdownItem';
import DropdownLabel from './parts/DropdownLabel/DropdownLabel';
import DropdownMenu from './parts/DropdownMenu/DropdownMenu';
import DropdownTrigger from './parts/DropdownTrigger';

interface DropdownProps<T> {
	children: React.ReactNode;
	value?: T;
	onChange?: (value: T) => void;
	onClose?: () => void;
}

const Dropdown = <T,>({
	children,
	value,
	onChange,
	onClose: onCloseProp,
}: DropdownProps<T>) => {
	const [open, setOpen] = useState(false);

	const onOpen = useCallback(() => setOpen(true), []);
	const onClose = useCallback(() => {
		setOpen(false);
		onCloseProp?.();
	}, [onCloseProp]);

	const { refs, floatingStyles, elements } = useFloating({
		open,
		onOpenChange: setOpen,
		middleware: [offset(8), flip(), shift()],
		whileElementsMounted: autoUpdate,
		strategy: 'absolute',
		transform: false,
	});

	const mainContextValue = useMemo(
		() => ({
			open,
			onOpen,
			onClose,
			selectedValue: value,
			onChange,
		}),
		[open, value, onChange, onOpen, onClose],
	) as DropdownContextType<unknown>;

	const triggerWidth = elements.reference?.getBoundingClientRect().width;

	const positionContextValue = useMemo(
		() => ({
			refs,
			floatingStyles,
			triggerWidth,
		}),
		[refs, floatingStyles, triggerWidth],
	) as DropdownPositionContextType;

	return (
		<DropdownContext.Provider value={mainContextValue}>
			<DropdownPositionContext.Provider value={positionContextValue}>
				{children}
			</DropdownPositionContext.Provider>
		</DropdownContext.Provider>
	);
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;
Dropdown.Group = DropdownGroup;
Dropdown.Label = DropdownLabel;
Dropdown.Item = DropdownItem;
Dropdown.Divider = DropdownDivider;

export default Dropdown;
