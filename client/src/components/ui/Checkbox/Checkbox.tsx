'use client';

import { useId } from 'react';
import styles from './Checkbox.module.scss';
import { CheckboxProps } from './Checkbox.types';

const Checkbox = ({ label, ...rest }: CheckboxProps) => {
	const generatedId = useId();
	const id = rest.id || generatedId;

	return (
		<div className={styles['checkbox']}>
			<input
				type="checkbox"
				{...rest}
				id={id}
			/>
			{label && <label htmlFor={id}>{label}</label>}
		</div>
	);
};

export default Checkbox;
