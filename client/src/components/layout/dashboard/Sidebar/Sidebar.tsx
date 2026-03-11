'use client';

import Guard from '@/components/guard/Guard';
import { Logo } from '@/components/icons';
import { Button, Skeleton } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { useWorkspaceId } from '@/hooks';
import { Link } from '@/i18n';
import { useGetExpanded, useSetExpanded, useToggleExpanded } from '@/stores';
import vars from '@/styles/export.module.scss';
import { useEffect } from 'react';
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb';
import styles from './Sidebar.module.scss';
import SidebarLink from './SidebarLink/SidebarLink';
import { SIDEBAR_LINKS } from './sidebarLinks';
import SidebarUser from './SidebarUser/SidebarUser';
import SidebarWorkspaces from './SidebarWorkspaces/SidebarWorkspaces';

const Sidebar = () => {
	const expanded = useGetExpanded();
	const setExpanded = useSetExpanded();
	const toggleExpanded = useToggleExpanded();
	const workspaceId = useWorkspaceId();

	useEffect(() => {
		const xlBreakpoint = parseInt(vars.breakpointXl);

		const handleResize = () => {
			if (window.innerWidth >= xlBreakpoint) {
				setExpanded(true);
			}
		};

		handleResize();
	}, [setExpanded]);

	const handleClose = () => toggleExpanded();

	return (
		<>
			<div
				className={`${styles['sidebar__overlay']} ${expanded ? styles['sidebar__overlay--active'] : ''}`}
				onClick={handleClose}
			/>
			<aside
				className={`${styles['sidebar']} ${expanded ? styles['sidebar--active'] : ''}`}
			>
				<div className={styles['sidebar__container']}>
					<div className={styles['sidebar__logo-container']}>
						<Link
							href={
								workspaceId !== undefined
									? PRIVATE_PAGES.DASHBOARD_WORKSPACE(workspaceId)
									: PRIVATE_PAGES.DASHBOARD
							}
							className={styles['sidebar__logo']}
						>
							<Logo width={32} height={32} />
							<span>Shortly</span>
						</Link>
					</div>
					<SidebarWorkspaces />
					<nav className={styles['sidebar__nav']}>
						<ul className={styles['sidebar__links']}>
							{SIDEBAR_LINKS(workspaceId).map((link) => (
								<Guard
									key={link.name}
									permissions={link.permission ? [link.permission] : []}
									loader={
										<Skeleton height={41} width="100%" borderRadius={6} />
									}
								>
									<li key={link.name}>
										<SidebarLink link={link} />
									</li>
								</Guard>
							))}
						</ul>
					</nav>
				</div>
				<div className={styles['sidebar__footer']}>
					<SidebarUser />
				</div>
			</aside>
			<div className={styles['sidebar__toggle-container']}>
				<Button
					className={styles['sidebar__toggle']}
					onClick={handleClose}
					isIcon
					variant="ghost"
					isRounded
				>
					<TbLayoutSidebarRightCollapse
						size={24}
						className={`${styles['sidebar__toggle-icon']} ${expanded ? styles['sidebar__toggle-icon--expanded'] : ''}`}
					/>
				</Button>
			</div>
		</>
	);
};

export default Sidebar;
