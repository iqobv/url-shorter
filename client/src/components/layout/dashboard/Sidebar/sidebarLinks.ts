import { PRIVATE_PAGES } from '@/config';
import { ISidebarLink } from '@/types';
import { messages } from '@/types/global';
import { MdDashboard, MdGroup, MdLink, MdShield } from 'react-icons/md';

export type SidebarLinkName = keyof typeof messages.dashboard.sidebar.links;

export type DashboardSidebarLink = ISidebarLink<SidebarLinkName>;

export const SIDEBAR_LINKS: DashboardSidebarLink[] = [
	{
		name: 'home',
		href: PRIVATE_PAGES.DASHBOARD,
		icon: MdDashboard,
	},
	{
		name: 'links',
		href: PRIVATE_PAGES.LINKS,
		icon: MdLink,
	},
	{
		name: 'members',
		href: PRIVATE_PAGES.MEMBERS,
		icon: MdGroup,
	},
	{
		name: 'roles',
		href: PRIVATE_PAGES.ROLES,
		icon: MdShield,
	},
];
