export const PERMISSIONS = {
	ADMIN: {
		ALL: 'admin.all',
	},
	WORKSPACE: {
		EDIT: 'workspace.edit',
		DELETE: 'workspace.delete',
	},
	ROLES: {
		VIEW: 'roles.view',
		CREATE: 'roles.create',
		EDIT: 'roles.edit',
		DELETE: 'roles.delete',
	},
	MEMBERS: {
		VIEW: 'members.view',
		ADD: 'members.add',
		REMOVE: 'members.remove',
		EDIT: 'members.edit',
	},
	AUDIT_LOG: {
		VIEW: 'audit_log.view',
	},
	LINKS: {
		VIEW_ALL: 'links.view_all',
		VIEW_OWN: 'links.view_own',
		CREATE: 'links.create',
		EDIT_ALL: 'links.edit_all',
		EDIT_OWN: 'links.edit_own',
		DELETE_ALL: 'links.delete_all',
		DELETE_OWN: 'links.delete_own',
	},
	INVITE: {
		SEND: 'invite.send',
		CREATE_LINK: 'invite.create_link',
		VIEW_LINKS_ALL: 'invite.view_links_all',
		VIEW_LINKS_OWN: 'invite.view_links_own',
		DELETE_LINK_ALL: 'invite.delete_link_all',
		DELETE_LINK_OWN: 'invite.delete_link_own',
	},
} as const;
