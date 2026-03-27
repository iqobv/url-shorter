'use client';

import { IClickMetrics } from '@/types';
import { useMemo } from 'react';

export interface SortedMetric {
	id: string;
	percentage: number;
	value: number;
}

export const useCalculatePercentage = (
	data: IClickMetrics | null | undefined,
	metricKey: keyof IClickMetrics[string] = 'total',
) => {
	return useMemo((): SortedMetric[] => {
		if (!data) return [];

		const entries = Object.entries(data);

		const totalSum = entries.reduce(
			(sum, [_, metrics]) => sum + (metrics[metricKey] || 0),
			0,
		);

		const result = entries.map(([id, metrics]) => {
			const value = metrics[metricKey] || 0;
			return {
				id,
				value,
				percentage: totalSum > 0 ? (value / totalSum) * 100 : 0,
			};
		});

		return result.sort((a, b) => b.percentage - a.percentage);
	}, [data, metricKey]);
};
