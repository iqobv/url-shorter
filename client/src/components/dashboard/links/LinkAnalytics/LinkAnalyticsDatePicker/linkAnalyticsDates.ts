import { ANALYTICS_KEYS } from '@/constants';
import { messages } from '@/i18n';
import { LinkAnalyticsQueryState } from '../LinkAnalytics';

type LinkAnalyticDateMessage = keyof typeof messages.links.analytics.dates;

interface LinkAnalyticDate {
	label: LinkAnalyticDateMessage;
	value: LinkAnalyticsQueryState;
}

export const LINK_ANALYTICS_DATES = (): LinkAnalyticDate[] => {
	const now = new Date();
	const toDate = now.toISOString();
	const oneHour = 60 * 60 * 1000;
	const oneDay = 24 * oneHour;

	return [
		{
			label: '24Hours',
			value: {
				toDate,
				fromDate: new Date(now.getTime() - oneDay).toISOString(),
				key: ANALYTICS_KEYS['24Hours'],
			},
		},
		{
			label: '7Days',
			value: {
				toDate,
				fromDate: new Date(now.getTime() - 7 * oneDay).toISOString(),
				key: ANALYTICS_KEYS['7Days'],
			},
		},
		{
			label: '30Days',
			value: {
				toDate,
				fromDate: new Date(now.getTime() - 30 * oneDay).toISOString(),
				key: ANALYTICS_KEYS['30Days'],
			},
		},
	];
};
