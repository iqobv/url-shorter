'use client';

import { ComponentProps } from 'react';
import styles from './FormLabel.module.scss';

interface FormLabelProps extends ComponentProps<'label'> {
	children: React.ReactNode;
}

const FormLabel = ({ children, htmlFor, ...rest }: FormLabelProps) => {
	return (
		<label
			htmlFor={htmlFor}
			className={styles['form-label']}
			{...rest}
		>
			{children}
		</label>
	);
};

export default FormLabel;
