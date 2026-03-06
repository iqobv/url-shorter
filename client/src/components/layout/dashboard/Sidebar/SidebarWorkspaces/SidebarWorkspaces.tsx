'use client';

import { getAllUserWorkspaces, getDefaultWorkspace } from '@/api';
import { Button } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { useGetUser } from '@/stores';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { BiExpandVertical } from 'react-icons/bi';
import styles from './SidebarWorkspaces.module.scss';

const SidebarWorkspaces = () => {
	const nameRef = useRef<HTMLParagraphElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [isAnimating, setIsAnimating] = useState(false);
	const [offset, setOffset] = useState(0);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const t = useTranslations('dashboard.sidebar.workspaces');

	const user = useGetUser();

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

	useEffect(() => {
		if (!dropdownOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') handleClose();
		};

		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node) &&
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [dropdownOpen]);

	const { data: defaultWorkspace } = useQuery({
		queryFn: getDefaultWorkspace,
		queryKey: QUERY_KEYS.WORKSPACE.DEFAULT(user?.id || ''),
	});

	const { data: workspaces } = useQuery({
		queryFn: getAllUserWorkspaces,
		queryKey: QUERY_KEYS.WORKSPACE.ALL_WORKSPACES(user?.id || ''),
	});

	const handleClose = () => {
		setDropdownOpen(false);
	};

	return (
		<div className={styles['sidebar-workspaces']}>
			<div
				className={styles['sidebar-workspaces__container']}
				onClick={() => setDropdownOpen(!dropdownOpen)}
				ref={containerRef}
			>
				<div className={styles['sidebar-workspaces__content']}>
					<p
						ref={nameRef}
						className={`${styles['sidebar-workspaces__name']} ${
							isAnimating ? styles['sidebar-workspaces__name--animating'] : ''
						}`}
						style={{ '--offset': `-${offset}px` } as React.CSSProperties}
					>
						{defaultWorkspace?.name || 'My Workspace'}
					</p>
					<p className={styles['sidebar-workspaces__description']}>Personal</p>
				</div>
				<BiExpandVertical size={20} />
			</div>
			<div
				className={`${styles['sidebar-workspaces__dropdown']} ${dropdownOpen ? styles['sidebar-workspaces__dropdown--open'] : ''}`}
				ref={dropdownRef}
			>
				{workspaces && (
					<>
						<div className={styles['sidebar-workspaces__dropdown-section']}>
							<p>{t('own')}</p>
							{workspaces.own.map((w) => (
								<div
									key={w.id}
									className={styles['sidebar-workspaces__dropdown-item']}
								>
									<p>{w.name}</p>
								</div>
							))}
						</div>
						<div className={styles['sidebar-workspaces__dropdown-section']}>
							<p>{t('shared')}</p>
							{workspaces.shared.map((w) => (
								<div
									key={w.id}
									className={styles['sidebar-workspaces__dropdown-item']}
								>
									<p>{w.name}</p>
								</div>
							))}
						</div>
						<div>
							<Button fullWidth variant="outline">
								{t('create')}
							</Button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default SidebarWorkspaces;
