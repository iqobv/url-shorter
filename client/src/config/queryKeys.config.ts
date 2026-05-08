import { LinkAnalyticsQueryDto } from '@/dto';
import { ILinkLocal } from '@/types';
import { PaginationState, SortingState } from '@tanstack/react-table';

export const QUERY_KEYS = {
	AUTH: {
		LOGIN: ['auth', 'login'],
		REGISTER: ['auth', 'register'],
		USER: ['auth', 'user'],
		LOGOUT: ['auth', 'logout'],
	} as const,
	LINK: {
		ALL: (
			workspaceId: string,
			pagination: PaginationState,
			sorting: SortingState,
		) => ['links', workspaceId, pagination, sorting],
		CLAIM_LINKS: (links?: ILinkLocal[], userId?: string) => [
			'links',
			links,
			userId,
			'claim',
		],
		CREATE: (workspaceId: string) => ['links', workspaceId, 'create'],
		ANALYTICS: (
			workspaceId: string,
			linkId: string,
			query: LinkAnalyticsQueryDto,
		) => ['links', workspaceId, linkId, 'analytics', query],
	} as const,
	WORKSPACE: {
		DEFAULT: ['workspace'],
		ALL_WORKSPACES: ['workspaces'],
		GET_WORKSPACE: (workspaceId: string) => ['workspace', workspaceId],
	} as const,
	WORKSPACE_MEMBERS: {
		GET_BY_ID: (workspaceId: string, memberId: string) => [
			'workspace-members',
			workspaceId,
			memberId,
		],
		GET_ALL: (workspaceId: string) => ['workspace-members', workspaceId],
		USER_PERMISSIONS: (workspaceId: string) => [
			'workspace',
			workspaceId,
			'permissions',
		],
		UPDATE: (workspaceId: string, workspaceMemberId: string) => [
			'workspace-members',
			workspaceId,
			workspaceMemberId,
			'update',
		],
	} as const,
	ROLES: {
		ALL_ROLES: (workspaceId: string) => ['roles', workspaceId],
		ROLE: (workspaceId: string, roleId: string) => [
			'roles',
			workspaceId,
			roleId,
		],
		CREATE_ROLE: (workspaceId: string) => ['roles', workspaceId, 'create'],
		UPDATE_ROLE: (workspaceId: string, roleId: string) => [
			'roles',
			workspaceId,
			roleId,
			'update',
		],
	} as const,
};
