'use client';

import { FloatingPortal } from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useDropdownContext } from '../../DropdownContext';
import { useDropdownPositionContext } from '../../DropdownPositionContext';
import styles from './DropdownMenu.module.scss';

type DropdownMenuWidth = 'trigger' | 'content';

interface DropdownMenuProps {
	children: React.ReactNode;
	className?: string;
	width?: DropdownMenuWidth;
}

const name = 'Dropdown.Menu';

const DropdownMenu = ({
	children,
	className,
	width = 'trigger',
}: DropdownMenuProps) => {
	const menuRef = useRef<HTMLDivElement>(null);

	const { open, onClose } = useDropdownContext(name);
	const { floatingStyles, refs, triggerWidth } =
		useDropdownPositionContext(name);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			const clickedOutsideMenu =
				menuRef.current && !menuRef.current.contains(target);

			const clickedOutsideTrigger =
				refs?.domReference.current &&
				!refs.domReference.current.contains(target);

			if (clickedOutsideMenu && clickedOutsideTrigger) {
				onClose();
			}
		};

		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose, open, refs.domReference]);

	return (
		<FloatingPortal>
			<AnimatePresence>
				{open && (
					<motion.div
						ref={(node) => {
							refs?.setFloating(node);
							menuRef.current = node;
						}}
						initial={{ opacity: 0, scale: 0.95, y: -10 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: -10 }}
						transition={{ duration: 0.15, ease: 'easeOut' }}
						style={{
							...floatingStyles,
							width: width === 'trigger' ? triggerWidth : 'auto',
							transformOrigin: 'top',
						}}
						className={`${styles['dropdown-menu']} ${className || ''}`}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</FloatingPortal>
	);
};

export default DropdownMenu;
