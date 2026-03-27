'use client';

import { SortedMetric } from '@/hooks';
import LinkAnalyticsProgressBar from '../../../LinkAnalyticsProgressBar/LinkAnalyticsProgressBar';
import styles from './LinkAnalyticsMetricsCardContent.module.scss';

interface LinkAnalyticsMetricsCardContentProps {
	data: SortedMetric[];
	renderLabel?: (name: string) => React.ReactNode;
}

const LinkAnalyticsMetricsCardContent = ({
	data,
	renderLabel,
}: LinkAnalyticsMetricsCardContentProps) => {
	return (
		<div className={styles['link-analytics-metrics-card-content']}>
			{data.map(({ id, percentage }) => (
				<div
					className={styles['link-analytics-metrics-card-content__item']}
					key={id}
				>
					<div className={styles['link-analytics-metrics-card-content__label']}>
						{renderLabel ? renderLabel(id) : id}
					</div>
					<LinkAnalyticsProgressBar percentage={percentage} />
				</div>
			))}
		</div>
	);
};

export default LinkAnalyticsMetricsCardContent;
