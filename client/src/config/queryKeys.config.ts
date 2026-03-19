import { ILinkLocal } from '@/types';
import { PaginationState, SortingState } from '@tanstack/react-table';

export const QUERY_KEYS = {
	AUTH: {
		LOGIN: ['auth', 'login'],
		REGISTER: ['auth', 'register'],
		USER: ['auth', 'user'],
		LOGOUT: ['auth', 'logout'],
	},
	LINK: {
		ALL: (
			userId: string,
			workspaceId: string,
			pagination: PaginationState,
			sorting: SortingState,
		) => ['links', userId, workspaceId, pagination, sorting],
		CLAIM_LINKS: (links?: ILinkLocal[], userId?: string) => [
			'links',
			links,
			userId,
			'claim',
		],
	},
	WORKSPACE: {
		DEFAULT: (userId: string) => ['workspace', userId],
		ALL_WORKSPACES: (userId: string) => ['workspaces', userId],
		GET_WORKSPACE: (workspaceId: string) => ['workspace', workspaceId],
	},
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
	},
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
	},
};
