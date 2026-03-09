import { ILinkLocal } from '@/types';
import { PaginationState, SortingState } from '@tanstack/react-table';

export const QUERY_KEYS = {
	AUTH: {
		LOGIN: ['auth', 'login'],
		REGISTER: ['auth', 'register'],
		USER: ['auth', 'user'],
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
		USER_PERMISSIONS: (workspaceId: string) => [
			'workspace',
			workspaceId,
			'permissions',
		],
	},
};
