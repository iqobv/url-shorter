import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Auth, Authorized } from 'src/libs/decorators';
import { AnalyticsService } from './analytics.service';
import { AnalyticsQueryDto, GroupedClicksResponseDto } from './dto';

@Controller('analytics')
export class AnalyticsController {
	constructor(private readonly analyticsService: AnalyticsService) {}

	@Auth()
	@ApiOkResponse({ type: GroupedClicksResponseDto })
	@Get(':linkId')
	async getAnalyticsByLinkId(
		@Param('linkId') linkId: string,
		@Authorized('id') userId: string,
		@Query() query: AnalyticsQueryDto,
	) {
		return await this.analyticsService.getAnalyticsByLinkId(
			linkId,
			userId,
			query,
		);
	}
}
