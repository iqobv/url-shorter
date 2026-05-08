import { ACTION_KEYS } from '@libs/constants';
import { AuditChange } from '../audit-change.types';
import { AuditRoleInfo } from '../audit-role-info.types';

export interface WorkspaceMembersAuditMetadataMap {
	[ACTION_KEYS.WORKSPACE_MEMBER.INVITED]: {
		targetName: string;
		inviteMethod: 'user' | 'invite_link';
		invitedByName: string;
		inviteLinkCode?: string;
	};
	[ACTION_KEYS.WORKSPACE_MEMBER.REMOVED]: {
		targetName: string;
	};
	[ACTION_KEYS.WORKSPACE_MEMBER.EDITED]: {
		targetName: string;
		changes: AuditChange[];
	};
	[ACTION_KEYS.WORKSPACE_MEMBER.ROLES_UPDATED]: {
		targetName: string;
		added: AuditRoleInfo[];
		removed: AuditRoleInfo[];
	};
	[ACTION_KEYS.WORKSPACE_MEMBER.PERMISSION_UPDATED]: {
		targetName: string;
		added: string[];
		removed: string[];
	};
}
