'use client';

import styles from './DropdownGroup.module.scss';

interface DropdownGroupProps {
	children: React.ReactNode;
}

const DropdownGroup = ({ children }: DropdownGroupProps) => {
	return <div className={styles['dropdown-group']}>{children}</div>;
};

export default DropdownGroup;
