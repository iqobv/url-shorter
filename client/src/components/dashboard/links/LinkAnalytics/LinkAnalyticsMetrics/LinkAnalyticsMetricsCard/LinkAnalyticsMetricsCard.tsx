'use client';

import { Button, Modal } from '@/components/ui';
import { useCalculatePercentage } from '@/hooks';
import { IClickMetrics } from '@/types';
import { useTranslations } from 'next-intl';
import React from 'react';
import { BiExpandVertical } from 'react-icons/bi';
import LinkAnalyticsCard from '../../LinkAnalyticsCard/LinkAnalyticsCard';
import styles from './LinkAnalyticsMetricsCard.module.scss';
import LinkAnalyticsMetricsCardContent from './LinkAnalyticsMetricsCardContent/LinkAnalyticsMetricsCardContent';

interface LinkAnalyticsMetricsCardProps {
	title: React.ReactNode;
	data: IClickMetrics;
	renderLabel?: (name: string) => React.ReactNode;
	metricKey?: keyof IClickMetrics[string];
}

const limit = 5;

const LinkAnalyticsMetricsCard = ({
	title,
	data,
	metricKey = 'total',
	renderLabel,
}: LinkAnalyticsMetricsCardProps) => {
	const t = useTranslations('links.analytics');

	const progress = useCalculatePercentage(data, metricKey);

	const isEmpty = Object.keys(data).length === 0;

	const itemsToShow = progress.slice(0, limit);
	const shouldShowButton = progress.length > limit;

	return (
		<LinkAnalyticsCard
			title={title}
			className={styles.card}
		>
			{isEmpty ? (
				<p>{t('noData')}</p>
			) : (
				<LinkAnalyticsMetricsCardContent
					data={itemsToShow}
					renderLabel={renderLabel}
				/>
			)}
			{shouldShowButton && (
				<Modal>
					<Modal.Trigger>
						<Button
							size="md"
							fullWidth
							variant="ghost"
						>
							<p>{t('showMore')}</p>
							<BiExpandVertical size={18} />
						</Button>
					</Modal.Trigger>
					<Modal.Content>
						<Modal.Header>
							<h3>{title}</h3>
						</Modal.Header>
						<Modal.Body>
							<LinkAnalyticsMetricsCardContent
								data={progress}
								renderLabel={renderLabel}
							/>
						</Modal.Body>
					</Modal.Content>
				</Modal>
			)}
		</LinkAnalyticsCard>
	);
};

export default LinkAnalyticsMetricsCard;
