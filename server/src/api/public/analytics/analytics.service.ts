import { Injectable, NotFoundException } from '@nestjs/common';
import { Click } from 'generated/prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ERRORS } from 'src/libs/constants';
import { AnalyticsQueryDto, ClickMetricsDto, DailyAnalyticsDto } from './dto';

@Injectable()
export class AnalyticsService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAnalyticsByLinkId(
		linkId: string,
		userId: string,
		query: AnalyticsQueryDto,
	) {
		const link = await this.prismaService.link.findUnique({
			where: { id: linkId, userId },
			include: {
				clicks: {
					where: {
						...(query.fromDate && { clickedAt: { gte: query.fromDate } }),
						...(query.toDate && { clickedAt: { lte: query.toDate } }),
					},
				},
			},
		});

		if (!link) throw new NotFoundException(ERRORS.LINK.LINK_NOT_FOUND);

		const { clicks, ...rest } = link;

		const categories: (keyof Click)[] = ['country', 'device', 'browser', 'os'];

		const summary = categories.reduce(
			(acc, key) => {
				const label = `clicksBy${key.charAt(0).toUpperCase() + key.slice(1)}`;
				acc[label] = this.groupBy(clicks, key);
				return acc;
			},
			{} as Record<string, Record<string, ClickMetricsDto>>,
		);

		const dailyData = clicks.reduce(
			(acc, click) => {
				const date = click.clickedAt.toISOString().split('T')[0];

				if (!acc[date]) {
					acc[date] = {
						total: 0,
						unique: 0,
						clicksByCountry: {
							total: 0,
							unique: 0,
						},
						clicksByDevice: {
							total: 0,
							unique: 0,
						},
						clicksByBrowser: {
							total: 0,
							unique: 0,
						},
						clicksByOs: {
							total: 0,
							unique: 0,
						},
						_tempClicks: [],
					};
				}

				acc[date].total += 1;
				if (click.isUnique) acc[date].unique += 1;
				acc[date]._tempClicks.push(click);

				return acc;
			},
			{} as Record<string, DailyAnalyticsDto & { _tempClicks: Click[] }>,
		);

		const daily = Object.entries(dailyData).reduce(
			(acc, [date, data]) => {
				const { _tempClicks, ...stats } = data;

				categories.forEach((key) => {
					const label = `clicksBy${key.charAt(0).toUpperCase() + key.slice(1)}`;
					(stats as unknown as Record<string, Record<string, ClickMetricsDto>>)[
						label
					] = this.groupBy(_tempClicks, key);
				});

				acc[date] = stats as DailyAnalyticsDto;
				return acc;
			},
			{} as Record<string, DailyAnalyticsDto>,
		);

		return {
			link: rest,
			totalClicks: clicks.length,
			uniqueClicks: clicks.filter((click) => click.isUnique).length,
			summary,
			daily,
		};
	}

	private groupBy(
		clicks: Click[],
		key: keyof Click,
	): Record<string, ClickMetricsDto> {
		return clicks.reduce(
			(acc, click) => {
				const groupKey = String(click[key] || 'Unknown');

				if (!acc[groupKey]) {
					acc[groupKey] = { total: 0, unique: 0 };
				}

				acc[groupKey].total += 1;
				if (click.isUnique) {
					acc[groupKey].unique += 1;
				}

				return acc;
			},
			{} as Record<string, ClickMetricsDto>,
		);
	}
}
