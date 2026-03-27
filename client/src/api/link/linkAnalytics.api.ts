import { LinkAnalyticsQueryDto } from '@/dto';
import { ILinkAnalytics } from '@/types';
import api from '../axios.api';

export const getLinkAnalytics = async (
	workspaceId: string,
	linkId: string,
	query: LinkAnalyticsQueryDto,
) =>
	(
		await api.get<ILinkAnalytics>(
			`/v1/analytics/workspace/${workspaceId}/link/${linkId}`,
			{
				params: query,
			},
		)
	).data;
