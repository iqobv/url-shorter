'use server';

import { PERMISSIONS } from '@/constants';
import { Permissions } from '@/types';
import { getServerUserPermissions } from './getServerPermissions.util';

export const canPerformActionServer = async (
	workspaceId: string,
	requiredPermissions: Permissions[],
) => {
	const userPermissions = await getServerUserPermissions(workspaceId);

	if (userPermissions.includes(PERMISSIONS.ADMIN.ALL)) return true;

	return requiredPermissions.some((perm) => userPermissions.includes(perm));
};
