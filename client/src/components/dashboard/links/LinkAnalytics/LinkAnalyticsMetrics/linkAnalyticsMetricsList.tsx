import { messages } from '@/i18n';
import { IClickMetrics, ILinkAnalyticsMetrics } from '@/types';
import { NestedKeyOf } from 'next-intl';
import LinkAnalyticsCountries from './LinkAnalyticsCountries/LinkAnalyticsCountries';

export type MetricKey = NestedKeyOf<typeof messages.links.analytics.metrics>;

interface LinkAnalyticsMetricListItem {
	title: MetricKey;
	data: IClickMetrics;
	renderLabel?: (name: string) => React.ReactNode;
}

export const LINK_ANALYTICS_METRICS_LIST = (
	data: ILinkAnalyticsMetrics,
): LinkAnalyticsMetricListItem[] => {
	const metricsList = Object.entries(data).map(
		([key, value]): LinkAnalyticsMetricListItem => ({
			title: key as MetricKey,
			data: value,
			...(key === 'clicksByCountry' && {
				renderLabel: (name) => <LinkAnalyticsCountries name={name} />,
			}),
		}),
	);

	metricsList.sort((a, b) =>
		(a.title as string).localeCompare(b.title as string),
	);

	return metricsList;
};
