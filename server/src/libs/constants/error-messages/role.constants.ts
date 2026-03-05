export const ROLE_ERROR_MESSAGES = {
	ROLE_NOT_FOUND: 'Role not found',
	CANNOT_DELETE_ROLE_ASSIGNED_TO_MEMBERS:
		'Cannot delete a role that is assigned to members',
	NO_PERMISSION_TO_MANAGE_ROLE:
		'You do not have permission to manage this role',
	NO_PERMISSION_TO_ASSIGN_ROLE:
		'You do not have permission to assign this role to members',
	NO_PERMISSION_TO_REMOVE_ROLE:
		'You do not have permission to remove this role from members',
	NO_PERMISSION_TO_ADD_ADMIN_PERMISSIONS:
		'You cannot assign admin permissions to a role if you are not the workspace owner',
} as const;
