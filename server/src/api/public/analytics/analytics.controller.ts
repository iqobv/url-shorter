import { PERMISSIONS } from '@libs/constants';
import { Permissions } from '@libs/decorators';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { AnalyticsQueryDto, GroupedClicksResponseDto } from './dto';

@Controller('analytics')
export class AnalyticsController {
	constructor(private readonly analyticsService: AnalyticsService) {}

	@Permissions(PERMISSIONS.LINKS.VIEW_ALL)
	@ApiOkResponse({ type: GroupedClicksResponseDto })
	@Get('workspace/:workspaceId/link/:linkId')
	async getAnalyticsByLinkId(
		@Param('workspaceId') workspaceId: string,
		@Param('linkId') linkId: string,
		@Query() query: AnalyticsQueryDto,
	) {
		return await this.analyticsService.getAnalyticsByLinkId(
			workspaceId,
			linkId,
			query,
		);
	}
}
