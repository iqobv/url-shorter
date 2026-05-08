'use client';

import styles from './Checkbox.module.scss';
import { CheckboxProps } from './Checkbox.types';

const Checkbox = ({
	label,
	error,
	ref,
	disabled,
	disablePadding,
	...props
}: CheckboxProps) => {
	const wrapperClassNames = [
		styles.wrapper,
		error && styles.error,
		disabled && styles.disabled,
		disablePadding && styles.noPadding,
	]
		.filter(Boolean)
		.join(' ')
		.trim();

	return (
		<div className={wrapperClassNames}>
			<label className={styles.container}>
				<input
					type="checkbox"
					className={styles.input}
					ref={ref}
					disabled={disabled}
					{...props}
				/>
				<span className={styles.label}>{label}</span>
			</label>
			{error && <p className="error-message">{error}</p>}
		</div>
	);
};

export default Checkbox;
