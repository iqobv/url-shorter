import { Injectable, NotFoundException } from '@nestjs/common';
import { Click } from 'generated/prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ERRORS } from 'src/libs/constants';
import { AnalyticsQueryDto, ClickMetricsDto } from './dto';

@Injectable()
export class AnalyticsService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAnalyticsByLinkId(
		workspaceId: string,
		linkId: string,
		query: AnalyticsQueryDto,
	) {
		const { fromDate, toDate } = query;

		const link = await this.prismaService.link.findUnique({
			where: { id: linkId, workspaceId },
			include: {
				clicks: {
					where: {
						clickedAt: {
							...(fromDate && { gte: fromDate }),
							...(toDate && { lte: toDate }),
						},
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

		return {
			link: rest,
			totalClicks: clicks.length,
			uniqueClicks: clicks.filter((click) => click.isUnique).length,
			summary,
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
