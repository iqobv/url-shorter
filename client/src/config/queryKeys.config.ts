import { ILinkLocal } from '@/types';
import { PaginationState, SortingState } from '@tanstack/react-table';

export const QUERY_KEYS = {
	AUTH: {
		LOGIN: ['auth', 'login'],
		REGISTER: ['auth', 'register'],
		USER: ['auth', 'user'],
	} as const,
	LINK: {
		ALL: (
			userId: string,
			pagination: PaginationState,
			sorting: SortingState,
		) => ['links', userId, pagination, sorting],
		CLAIM_LINKS: (links?: ILinkLocal[], userId?: string) => [
			'links',
			links,
			userId,
			'claim',
		],
	} as const,
	WORKSPACE: {
		DEFAULT: (userId: string) => ['workspace', userId],
		ALL_WORKSPACES: (userId: string) => ['workspaces', userId],
	} as const,
} as const;
