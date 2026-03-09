'use client';

import ClonedElement from '../../ClonedElement';
import { useDropdownContext } from '../DropdownContext';
import { useDropdownPositionContext } from '../DropdownPositionContext';

interface DropdownTriggerProps {
	children: React.ReactElement;
}

const name = 'Dropdown.Trigger';

const DropdownTrigger = ({ children }: DropdownTriggerProps) => {
	const { open, onOpen, onClose } = useDropdownContext(name);
	const { refs } = useDropdownPositionContext(name);

	const handleClick = () => (open ? onClose() : onOpen());

	return ClonedElement({
		children,
		callback: handleClick,
		elementRef: refs?.setReference,
	});
};

export default DropdownTrigger;
