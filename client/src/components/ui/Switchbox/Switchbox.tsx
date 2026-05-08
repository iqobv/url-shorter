'use client';

import { useId } from 'react';
import styles from './Switchbox.module.scss';
import { SwitchboxProps } from './Switchbox.types';

const Switchbox = ({
	id,
	checked,
	label,
	onChange,
	disabled,
	...rest
}: SwitchboxProps) => {
	const generatedId = useId();

	return (
		<div className={styles.switchbox}>
			{!!label && (
				<label
					className={styles.label}
					htmlFor={id || generatedId}
				>
					{label}
				</label>
			)}
			<input
				id={id || generatedId}
				className={styles.input}
				type="checkbox"
				checked={checked}
				onChange={onChange}
				disabled={disabled}
				{...rest}
			/>
		</div>
	);
};

export default Switchbox;
