'use client';

import { useId } from 'react';
import styles from './Switchbox.module.scss';
import { SwitchboxProps } from './Switchbox.types';

const Switchbox = ({
	id,
	checked,
	label,
	onChange,
	...rest
}: SwitchboxProps) => {
	const generatedId = useId();

	return (
		<div className={styles['switchbox']}>
			{!!label && (
				<label
					className={styles['switchbox__label']}
					htmlFor={id || generatedId}
				>
					{label}
				</label>
			)}
			<input
				id={id || generatedId}
				className={styles['switchbox__input']}
				type="checkbox"
				checked={checked}
				onChange={onChange}
				{...rest}
			/>
		</div>
	);
};

export default Switchbox;
