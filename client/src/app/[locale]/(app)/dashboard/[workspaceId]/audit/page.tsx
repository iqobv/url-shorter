import { PERMISSIONS } from '@/constants';
import { TPageParams, WorkspaceIdParams } from '@/types';
import { generateTitle, pageCheckPermission } from '@/utils';

export async function generateMetadata({ params }: { params: TPageParams }) {
	return generateTitle(params, 'metadata.pages.dashboard.auditLog.default');
}

export default async function AuditLogPage({ params }: WorkspaceIdParams) {
	await pageCheckPermission({
		params,
		requiredPermissions: [PERMISSIONS.AUDIT_LOG.VIEW],
	});

	return <div></div>;
}
