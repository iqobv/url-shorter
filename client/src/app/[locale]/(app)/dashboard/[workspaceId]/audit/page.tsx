import { PERMISSIONS } from '@/constants';
import { WorkspaceIdParams } from '@/types';
import { pageCheckPermission } from '@/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Audit Log',
};

export default async function AuditLogPage({ params }: WorkspaceIdParams) {
	await pageCheckPermission({
		params,
		requiredPermissions: [PERMISSIONS.AUDIT_LOG.VIEW],
	});

	return <div></div>;
}
