'use client';

import { Link, usePathname } from '@/i18n';
import { DashboardSidebarLink } from '../sidebarLinks';

import { useTranslations } from 'next-intl';
import styles from './SidebarLink.module.scss';

interface SidebarLinkProps {
	link: DashboardSidebarLink;
	onClick?: () => void;
	isMobile?: boolean;
}

const SidebarLink = ({ link, onClick, isMobile }: SidebarLinkProps) => {
	const pathname = usePathname();

	const t = useTranslations('dashboard.sidebar.links');
	const Icon = link.icon;

	const isActive = pathname === link.href;

	return (
		<Link
			className={`${styles['sidebar-link']} ${isActive ? styles['sidebar-link--active'] : ''}`.trim()}
			href={link.href}
			onClick={() => {
				if (isMobile && onClick) onClick();
			}}
		>
			{Icon && <Icon />}
			<span>{t(link.name)}</span>
		</Link>
	);
};

export default SidebarLink;
