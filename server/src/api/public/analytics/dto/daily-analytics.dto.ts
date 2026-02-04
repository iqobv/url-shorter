import { ClickMetricsDto } from './click-metrics.dto';

export class DailyAnalyticsDto {
	total: 0;
	unique: 0;
	clicksByCountry: ClickMetricsDto;
	clicksByDevice: ClickMetricsDto;
	clicksByBrowser: ClickMetricsDto;
	clicksByOs: ClickMetricsDto;
}
