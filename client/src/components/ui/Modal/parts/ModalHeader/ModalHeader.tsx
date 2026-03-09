'use client';

import { ReactNode } from 'react';
import styles from './ModalHeader.module.scss';

const ModalHeader = ({ children }: { children: ReactNode }) => {
	return <div className={styles['modal__header']}>{children}</div>;
};

export default ModalHeader;
