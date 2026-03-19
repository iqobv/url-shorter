'use server';

import { PRIVATE_PAGES } from '@/config';
import { Permissions, WorkspaceIdParams } from '@/types';
import { redirect } from 'next/navigation';
import { canPerformActionServer } from './canPerformActionServer.util';

interface PageCheckPermissionProps extends WorkspaceIdParams {
	requiredPermissions: Permissions[];
	redirectTo?: (workspaceId: string) => string;
}

export const pageCheckPermission = async ({
	params,
	requiredPermissions,
	redirectTo = (workspaceId) => PRIVATE_PAGES.DASHBOARD_WORKSPACE(workspaceId),
}: PageCheckPermissionProps) => {
	const { workspaceId } = await params;

	const canPerform = await canPerformActionServer(
		workspaceId,
		requiredPermissions,
	);

	if (!canPerform) redirect(redirectTo(workspaceId));
};
