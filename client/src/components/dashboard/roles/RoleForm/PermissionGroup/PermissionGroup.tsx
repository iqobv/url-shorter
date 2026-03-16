'use client';

import { Permissions } from '@/types';
import { useTranslations } from 'next-intl';
import { PermissionsGroup } from '../../CreateRole/CreateRoleForm/CreateRoleForm';
import PermissionField from '../PermissionField/PermissionField';

interface PermissionGroupProps {
	group: PermissionsGroup;
	selectedPermissions: string[];
	handleCheckboxChange: (permission: Permissions[number]) => void;
}

const PermissionGroup = ({
	group,
	selectedPermissions,
	handleCheckboxChange,
}: PermissionGroupProps) => {
	const t = useTranslations('role.groups');

	return (
		<div>
			<h3>{t(group.name)}</h3>
			{group.permissions.map((permission) => (
				<PermissionField
					key={permission}
					permission={permission}
					selectedPermissions={selectedPermissions}
					handleCheckboxChange={handleCheckboxChange}
				/>
			))}
		</div>
	);
};

export default PermissionGroup;
