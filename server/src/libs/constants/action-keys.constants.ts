export const ACTION_KEYS = {
	WORKSPACE: {
		EDITED: 'workspace.edited',
		DELETED: 'workspace.deleted',
	},
	LINK: {
		CREATED: 'link.created',
		EDITED: 'link.edited',
		DELETED: 'link.deleted',
		CLAIMED: 'link.claimed',
	},
	WORKSPACE_MEMBER: {
		INVITED: 'workspace_member.invited',
		REMOVED: 'workspace_member.removed',
		EDITED: 'workspace_member.edited',
		ROLES_UPDATED: 'workspace_member.roles_updated',
		PERMISSION_UPDATED: 'workspace_member.permission_updated',
	},
	ROLE: {
		CREATED: 'role.created',
		EDITED: 'role.edited',
		DELETED: 'role.deleted',
	},
	INVITE_LINK: {
		CREATED: 'invite_link.created',
		DELETED: 'invite_link.deleted',
		USED: 'invite_link.used',
	},
} as const;
