'use client';

import { ILinkAnalyticsMetrics } from '@/types';
import { useTranslations } from 'next-intl';
import styles from './LinkAnalyticsMetrics.module.scss';
import LinkAnalyticsMetricsCard from './LinkAnalyticsMetricsCard/LinkAnalyticsMetricsCard';
import { LINK_ANALYTICS_METRICS_LIST } from './linkAnalyticsMetricsList';

interface LinkAnalyticsMetricsProps {
	data: ILinkAnalyticsMetrics;
}

const LinkAnalyticsMetrics = ({ data }: LinkAnalyticsMetricsProps) => {
	const t = useTranslations('links.analytics.metrics');

	return (
		<div className={styles['link-analytics-metrics']}>
			{LINK_ANALYTICS_METRICS_LIST(data).map(({ data, title, renderLabel }) => (
				<LinkAnalyticsMetricsCard
					key={title}
					data={data}
					title={t(title)}
					renderLabel={renderLabel}
				/>
			))}
		</div>
	);
};

export default LinkAnalyticsMetrics;
