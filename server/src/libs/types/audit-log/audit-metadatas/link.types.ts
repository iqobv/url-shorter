import { ACTION_KEYS } from '@libs/constants';
import { AuditChange } from '../audit-change.types';

export interface LinkAuditMetadataMap {
	[ACTION_KEYS.LINK.CREATED]: {
		slug: string;
		originalUrl: string;
	};
	[ACTION_KEYS.LINK.EDITED]: {
		slug: string;
		changes: AuditChange[];
	};
	[ACTION_KEYS.LINK.DELETED]: {
		slug: string;
		title?: string;
	};
	[ACTION_KEYS.LINK.CLAIMED]: {
		count: number;
		slugs: string[];
	};
}
