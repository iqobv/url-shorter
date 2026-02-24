'use client';

import { InputProps } from './Input.types';

import { useId, useRef, useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import Button from '../Button/Button';
import styles from './Input.module.scss';

const Input = ({
	error,
	leftSection,
	rightSection,
	label,
	type = 'text',
	ref,
	...rest
}: InputProps) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const generatedId = useId();
	const id = rest.id ?? generatedId;

	const inputRef = useRef<HTMLInputElement>(null);

	const handleWrapperClick = () => {
		if (inputRef.current && document.activeElement !== inputRef.current) {
			inputRef.current.focus();
		}
	};

	const handleChangeVisible = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	const isPassword = type === 'password';

	const finalType = isPassword
		? isPasswordVisible
			? 'text'
			: 'password'
		: type;

	return (
		<div className={styles['input-container']}>
			{!!label && (
				<label htmlFor={id} className={styles['input-label']}>
					{label}
				</label>
			)}
			<div
				className={`${styles['input-wrapper']} ${!!error ? styles['input-wrapper--error'] : ''}`}
				onClick={handleWrapperClick}
			>
				{leftSection && (
					<label htmlFor={id} className={styles['section-left']}>
						{leftSection}
					</label>
				)}
				<input
					ref={(node) => {
						inputRef.current = node;

						if (typeof ref === 'function') {
							ref(node);
						} else if (ref) {
							ref.current = node;
						}
					}}
					id={id}
					className={`${styles['input']} ${rest.className}`}
					type={finalType}
					{...rest}
				/>
				{isPassword && (
					<div className={styles['section-right']}>
						<Button
							type="button"
							onClick={handleChangeVisible}
							variant="ghost"
							isIcon
							isRounded
						>
							{isPasswordVisible ? <IoMdEyeOff /> : <IoMdEye />}
						</Button>
					</div>
				)}
				{rightSection && (
					<div
						className={styles['section-right']}
						onClick={(e) => e.stopPropagation()}
					>
						{rightSection}
					</div>
				)}
			</div>
			{error && <span className={styles['error-message']}>{error}</span>}
		</div>
	);
};

export default Input;
