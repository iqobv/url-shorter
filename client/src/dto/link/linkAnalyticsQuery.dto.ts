import { linkAnalyticsQuerySchema } from '@/schemas';
import z from 'zod';

export type LinkAnalyticsQueryDto = z.infer<typeof linkAnalyticsQuerySchema>;
