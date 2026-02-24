'use client';

import Loader from '../../Loader/Loader';
import styles from './ButtonContent.module.scss';

interface ButtonContentProps {
	children: React.ReactNode;
	loading: boolean;
	className?: string;
	isInverse?: boolean;
}

const ButtonContent = ({
	children,
	loading,
	className,
	isInverse = false,
}: ButtonContentProps) => {
	return (
		<div
			className={`${styles['button__inner']} ${
				loading ? styles['button__inner--loading'] : ''
			} ${className ?? ''}`}
		>
			<div className={styles['button__content']}>{children}</div>
			{loading && (
				<Loader
					containerClassName={styles['button__loader']}
					disablePadding
					thickness={4}
					size={22}
					isInverse={isInverse}
				/>
			)}
		</div>
	);
};

export default ButtonContent;
