'use client';

import { Button } from '@/components/ui';
import { useTranslations } from 'next-intl';
import { LinkAnalyticsQueryState } from '../LinkAnalytics';
import styles from './LinkAnalyticsDatePicker.module.scss';
import { LINK_ANALYTICS_DATES } from './linkAnalyticsDates';

interface LinkAnalyticsDatePickerProps {
	query: LinkAnalyticsQueryState;
	setQuery: React.Dispatch<React.SetStateAction<LinkAnalyticsQueryState>>;
}

const LinkAnalyticsDatePicker = ({
	query,
	setQuery,
}: LinkAnalyticsDatePickerProps) => {
	const t = useTranslations('links.analytics.dates');

	return (
		<div className={styles['link-analytics-date-picker']}>
			{LINK_ANALYTICS_DATES().map(({ label, value }) => (
				<Button
					key={label}
					variant={query.key === value.key ? 'secondary' : 'outline'}
					onClick={() => setQuery(value)}
				>
					{t(label)}
				</Button>
			))}
		</div>
	);
};

export default LinkAnalyticsDatePicker;
