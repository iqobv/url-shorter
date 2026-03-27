'use client';

import { getLinkAnalytics } from '@/api/link/linkAnalytics.api';
import { QUERY_KEYS } from '@/config';
import { ANALYTICS_KEYS } from '@/constants';
import { LinkAnalyticsQueryDto } from '@/dto';
import { useWorkspaceId } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import styles from './LinkAnalytics.module.scss';
import LinkAnalyticsDatePicker from './LinkAnalyticsDatePicker/LinkAnalyticsDatePicker';
import LinkAnalyticsMetrics from './LinkAnalyticsMetrics/LinkAnalyticsMetrics';
import LinkAnalyticsMetricsLoader from './LinkAnalyticsMetrics/LinkAnalyticsMetricsLoader';

export interface LinkAnalyticsQueryState extends LinkAnalyticsQueryDto {
	key: string;
}

const LinkAnalytics = () => {
	const workspaceId = useWorkspaceId();

	const now = new Date();

	const { linkId } = useParams<{ linkId: string }>();
	const [query, setQuery] = useState<LinkAnalyticsQueryState>({
		toDate: now.toISOString(),
		fromDate: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
		key: ANALYTICS_KEYS['24Hours'],
	});

	const { data, isLoading } = useQuery({
		queryFn: () => {
			const { key, ...payload } = query;
			return getLinkAnalytics(workspaceId, linkId, payload);
		},
		queryKey: QUERY_KEYS.LINK.ANALYTICS(workspaceId, linkId, query),
	});

	console.log(data);

	return (
		<div className={styles['analytics']}>
			<LinkAnalyticsDatePicker
				query={query}
				setQuery={setQuery}
			/>
			{isLoading && (
				<div className={styles['analytics__content']}>
					<LinkAnalyticsMetricsLoader />
				</div>
			)}
			{data && (
				<div className={`${styles['analytics__content']} fade-in`}>
					<LinkAnalyticsMetrics data={data.summary} />
				</div>
			)}
		</div>
	);
};

export default LinkAnalytics;
