'use client';

import styles from './LinkAnalyticsProgressBar.module.scss';

interface LinkAnalyticsProgressBarProps {
	percentage: number;
	className?: string;
}

const LinkAnalyticsProgressBar = ({
	percentage,
	className,
}: LinkAnalyticsProgressBarProps) => {
	return (
		<div className={styles['progress-bar']}>
			<div className={styles['progress-bar__percentage']}>
				{percentage >= 1 ? percentage.toFixed(1) : '<1'}%
			</div>
			<div
				className={`${styles['progress-bar__container']} ${className || ''}`.trim()}
			>
				<div
					className={styles['progress-bar__fill']}
					style={{ width: `${percentage.toFixed(2)}%` }}
				/>
			</div>
		</div>
	);
};

export default LinkAnalyticsProgressBar;
