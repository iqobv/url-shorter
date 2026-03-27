import { ILink } from './link.types';
import { ILinkAnalyticsMetrics } from './linkAnalyticsMetrics.types';

export interface ILinkAnalytics {
	link: ILink;
	totalClicks: number;
	uniqueClicks: number;
	summary: ILinkAnalyticsMetrics;
}
