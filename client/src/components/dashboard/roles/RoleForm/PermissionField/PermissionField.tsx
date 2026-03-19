'use client';

import { Switchbox } from '@/components/ui';
import { Permissions } from '@/types';
import { useTranslations } from 'next-intl';
import styles from './PermissionField.module.scss';

interface PermissionFieldProps {
	permission: Permissions[number];
	selectedPermissions: string[];
	handleCheckboxChange: (permission: Permissions[number]) => void;
}

const PermissionField = ({
	permission,
	selectedPermissions,
	handleCheckboxChange,
}: PermissionFieldProps) => {
	const t = useTranslations('role.permissions');

	return (
		<div
			key={permission}
			className={styles['permission-field']}
		>
			<div className={styles['permission-field__content']}>
				<label
					htmlFor={permission}
					className={styles['permission-field__label']}
				>
					{t(`${permission}.label` as never)}
				</label>
				<Switchbox
					id={permission}
					checked={selectedPermissions.includes(permission)}
					onChange={() => handleCheckboxChange(permission)}
				/>
			</div>
			<p className={styles['permission-field__description']}>
				{t(`${permission}.description` as never)}
			</p>
		</div>
	);
};

export default PermissionField;
