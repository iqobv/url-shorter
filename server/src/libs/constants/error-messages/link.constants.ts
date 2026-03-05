export const LINK_ERROR_MESSAGES = {
	CUSTOM_ALIAS_ALREADY_EXISTS: 'Custom alias is already in use',
	CUSTOM_ALIAS_NOT_AUTHENTICATED:
		'Custom alias can only be set by authenticated users',
	LINK_NOT_FOUND: 'Link not found',
	USER_DOES_NOT_HAVE_PERMISSION_TO_DELETE_LINK:
		'You do not have permission to delete this link',
	WORKSPACE_ID_REQUIRED_FOR_CUSTOM_ALIAS:
		'Workspace ID is required when setting a custom alias',
	LINK_NOT_FOUND_IN_WORKSPACE: 'Link not found in the specified workspace',
	WORKSPACE_ID_NOT_ALLOWED_FOR_GUEST:
		'Workspace ID cannot be set for guest users',
	USER_DOES_NOT_HAVE_PERMISSION_TO_CREATE_LINK:
		'You do not have permission to create a link in this workspace',
} as const;
