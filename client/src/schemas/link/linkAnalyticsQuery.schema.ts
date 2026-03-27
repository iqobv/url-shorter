import z from 'zod';

export const linkAnalyticsQuerySchema = z
	.object({
		fromDate: z.iso.datetime(),
		toDate: z.iso.datetime(),
	})
	.refine(
		(data) => {
			const to = new Date(data.toDate);
			const now = new Date();
			return to <= now;
		},
		{
			error: 'To date must be in the past',
			path: ['toDate'],
		},
	)
	.refine(
		(data) => {
			const to = new Date(data.toDate);
			const from = new Date(data.fromDate);
			return to >= from;
		},
		{
			error: 'To date must be after from date',
			path: ['fromDate'],
		},
	);
