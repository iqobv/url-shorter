import { IClickMetrics } from './clickMetrics.types';

export interface ILinkAnalyticsMetrics {
	clicksByCountry: IClickMetrics;
	clicksByDevice: IClickMetrics;
	clicksByBrowser: IClickMetrics;
	clicksByOs: IClickMetrics;
}
