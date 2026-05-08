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
		<div className={`${styles.card} ${containerClassName || ''}`}>
			<h3 className={styles.title}>{title}</h3>
			<div className={`${styles.content} ${className || ''}`}>{children}</div>
		</div>
	);
};

export default LinkAnalyticsCard;
