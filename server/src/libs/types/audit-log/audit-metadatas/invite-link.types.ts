import { ACTION_KEYS } from 'src/libs/constants';

export interface InviteLinkAuditMetadataMap {
	[ACTION_KEYS.INVITE_LINK.CREATED]: {
		code: string;
		roleName: string;
		expiresAt: Date | null;
	};
	[ACTION_KEYS.INVITE_LINK.DELETED]: {
		code: string;
	};
	[ACTION_KEYS.INVITE_LINK.USED]: {
		code: string;
		userName: string;
		createdByName: string;
	};
}
