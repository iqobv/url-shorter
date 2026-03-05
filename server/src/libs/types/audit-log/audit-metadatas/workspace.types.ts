import { ACTION_KEYS } from 'src/libs/constants';
import { AuditChange } from '../audit-change.types';

export interface WorkspaceAuditMetadataMap {
	[ACTION_KEYS.WORKSPACE.EDITED]: {
		name: string;
		changes: AuditChange[];
	};
	[ACTION_KEYS.WORKSPACE.DELETED]: {
		name: string;
	};
}
