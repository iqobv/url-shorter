import { PRIVATE_PAGES } from '@/config';
import { PERMISSIONS } from '@/constants';
import { messages } from '@/i18n';
import { ISidebarLink, Permissions } from '@/types';
import { NestedKeyOf } from 'next-intl';
import {
	MdDashboard,
	MdGroup,
	MdLink,
	MdOutlineHistory,
	MdShield,
} from 'react-icons/md';

export type SidebarLinkName = NestedKeyOf<
	typeof messages.dashboard.sidebar.links
>;

export interface DashboardSidebarLink extends ISidebarLink<SidebarLinkName> {
	permission?: Permissions;
}

export const SIDEBAR_LINKS = (workspaceId: string): DashboardSidebarLink[] => [
	{
		name: 'home',
		href: PRIVATE_PAGES.DASHBOARD_WORKSPACE(workspaceId),
		icon: MdDashboard,
	},
	{
		name: 'links',
		href: PRIVATE_PAGES.LINKS(workspaceId),
		icon: MdLink,
	},
	{
		name: 'members',
		href: PRIVATE_PAGES.MEMBERS(workspaceId),
		icon: MdGroup,
		permission: PERMISSIONS.MEMBERS.VIEW,
	},
	{
		name: 'roles',
		href: PRIVATE_PAGES.ROLES(workspaceId),
		icon: MdShield,
		permission: PERMISSIONS.ROLES.VIEW,
	},
	{
		name: 'audit',
		href: PRIVATE_PAGES.AUDIT_LOG(workspaceId),
		icon: MdOutlineHistory,
		permission: PERMISSIONS.AUDIT_LOG.VIEW,
	},
];
