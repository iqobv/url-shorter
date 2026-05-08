'use client';

import { PERMISSIONS } from '@/constants';
import { Permissions } from '@/types';
import { useTranslations } from 'next-intl';
import PermissionField from '../PermissionField/PermissionField';
import { PermissionsGroup } from '../RoleForm';

interface PermissionGroupProps {
	group: PermissionsGroup;
	selectedPermissions: string[];
	handleCheckboxChange: (permission: Permissions[number]) => void;
	selectedAdmin: boolean;
}

const PermissionGroup = ({
	group,
	selectedPermissions,
	handleCheckboxChange,
	selectedAdmin,
}: PermissionGroupProps) => {
	const t = useTranslations('role.groups');

	return (
		<div>
			<h3>{t(group.name as never)}</h3>
			{group.permissions.map((permission) => {
				const disabled = selectedAdmin && permission !== PERMISSIONS.ADMIN.ALL;

				return (
					<PermissionField
						key={permission as string}
						permission={permission}
						selectedPermissions={selectedPermissions}
						handleCheckboxChange={handleCheckboxChange}
						disabled={disabled}
					/>
				);
			})}
		</div>
	);
};

export default PermissionGroup;
