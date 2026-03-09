'use client';

import styles from './DropdownLabel.module.scss';

interface DropdownLabelProps {
	children: React.ReactNode;
}

const DropdownLabel = ({ children }: DropdownLabelProps) => {
	return <label className={styles['dropdown-label']}>{children}</label>;
};

export default DropdownLabel;
