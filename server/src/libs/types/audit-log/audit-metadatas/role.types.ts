import { ACTION_KEYS } from '@libs/constants';
import { AuditChange } from '../audit-change.types';

export interface RoleAuditMetadataMap {
	[ACTION_KEYS.ROLE.CREATED]: {
		roleName: string;
	};
	[ACTION_KEYS.ROLE.EDITED]: {
		roleName: string;
		changes: AuditChange[];
	};
	[ACTION_KEYS.ROLE.DELETED]: {
		roleName: string;
	};
}
