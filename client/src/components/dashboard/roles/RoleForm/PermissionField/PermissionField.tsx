'use client';

import { Switchbox } from '@/components/ui';
import { Permissions } from '@/types';
import { useTranslations } from 'next-intl';
import styles from './PermissionField.module.scss';

interface PermissionFieldProps {
	permission: Permissions[number];
	selectedPermissions: string[];
	handleCheckboxChange: (permission: Permissions[number]) => void;
	disabled?: boolean;
}

const PermissionField = ({
	permission,
	selectedPermissions,
	handleCheckboxChange,
	disabled = false,
}: PermissionFieldProps) => {
	const t = useTranslations('role.permissions');

	return (
		<div className={styles.field}>
			<div className={styles.content}>
				<label
					htmlFor={permission}
					className={styles.label}
				>
					{t(`${permission}.label` as never)}
				</label>
				<Switchbox
					id={permission}
					checked={selectedPermissions.includes(permission)}
					onChange={() => handleCheckboxChange(permission)}
					disabled={disabled}
				/>
			</div>
			<p className={styles.description}>
				{t(`${permission}.description` as never)}
			</p>
		</div>
	);
};

export default PermissionField;
