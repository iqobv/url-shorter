'use client';

import { ReactNode } from 'react';

interface ModalBodyProps {
	children: ReactNode;
	className?: string;
}

const ModalBody = ({ children, className }: ModalBodyProps) => {
	return <div className={className}>{children}</div>;
};

export default ModalBody;
