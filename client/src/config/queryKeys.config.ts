import { ILinkLocal } from '@/types';

export const QUERY_KEYS = {
	AUTH: {
		LOGIN: ['auth', 'login'],
		REGISTER: ['auth', 'register'],
		USER: ['auth', 'user'],
	},
	LINK: {
		ALL: (userId: string) => ['links', userId],
		CLAIM_LINKS: (links?: ILinkLocal[], userId?: string) => [
			'links',
			links,
			userId,
			'claim',
		],
	},
};
