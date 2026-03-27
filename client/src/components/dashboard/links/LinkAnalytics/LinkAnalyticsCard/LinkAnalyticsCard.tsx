'use client';

import styles from './LinkAnalyticsCard.module.scss';

interface LinkAnalyticsCardProps {
	children: React.ReactNode;
	title: React.ReactNode;
	className?: string;
	containerClassName?: string;
}

const LinkAnalyticsCard = ({
	children,
	title,
	className,
	containerClassName,
}: LinkAnalyticsCardProps) => {
	return (
		<div
			className={`${styles['link-analytics-card']} ${containerClassName || ''}`}
		>
			<h3 className={styles['link-analytics-card__title']}>{title}</h3>
			<div
				className={`${styles['link-analytics-card__content']} ${className || ''}`}
			>
				{children}
			</div>
		</div>
	);
};

export default LinkAnalyticsCard;
