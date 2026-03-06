'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { DashboardSidebarLink } from '../sidebarLinks';

import styles from './SidebarLink.module.scss';

interface SidebarLinkProps {
	link: DashboardSidebarLink;
}

const SidebarLink = ({ link }: SidebarLinkProps) => {
	const t = useTranslations('dashboard.sidebar.links');
	const Icon = link.icon;

	return (
		<Link className={styles['sidebar-link']} href={link.href}>
			{Icon && <Icon />}
			<span>{t(link.name)}</span>
		</Link>
	);
};

export default SidebarLink;
