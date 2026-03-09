'use client';

import { Dropdown } from '@/components/ui';
import { useEffect, useRef, useState } from 'react';
import { BiExpandVertical } from 'react-icons/bi';
import styles from './SidebarWorkspacesTrigger.module.scss';

interface SidebarWorkspacesTriggerProps {
	name: string;
	type: string;
}

const SidebarWorkspacesTrigger = ({
	name,
	type,
}: SidebarWorkspacesTriggerProps) => {
	const nameRef = useRef<HTMLParagraphElement>(null);
	const [isAnimating, setIsAnimating] = useState(false);
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		const element = nameRef.current;
		const container = element?.parentElement;
		if (!element || !container) return;

		const calculateOffset = () => {
			const textWidth = element.scrollWidth;
			const containerWidth = container.offsetWidth;

			if (textWidth > containerWidth) {
				setIsAnimating(true);
				setOffset(textWidth - containerWidth + 10);
			} else {
				setIsAnimating(false);
				setOffset(0);
			}
		};

		const resizeObserver = new ResizeObserver(calculateOffset);
		resizeObserver.observe(element);
		resizeObserver.observe(container);

		calculateOffset();

		return () => resizeObserver.disconnect();
	}, []);

	return (
		<Dropdown.Trigger>
			<div className={styles['sidebar-workspaces__container']}>
				<div className={styles['sidebar-workspaces__content']}>
					<p
						ref={nameRef}
						className={`${styles['sidebar-workspaces__name']} ${
							isAnimating ? styles['sidebar-workspaces__name--animating'] : ''
						}`}
						style={{ '--offset': `-${offset}px` } as React.CSSProperties}
					>
						{name}
					</p>
					<p className={styles['sidebar-workspaces__description']}>{type}</p>
				</div>
				<BiExpandVertical size={20} />
			</div>
		</Dropdown.Trigger>
	);
};

export default SidebarWorkspacesTrigger;
