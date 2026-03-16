'use client';

import { TMessages } from '@/types';
import { useTranslations } from 'next-intl';

interface ZodErrorPayload {
	code: string;
	field: string;
	minimum?: number;
	maximum?: number;
	[key: string]: unknown;
}

export const useZodErrorMap = (namespace?: TMessages) => {
	const t = useTranslations('zod');
	const fieldT = useTranslations(namespace as never);

	return (error: unknown) => {
		if (!error || typeof error !== 'object' || !('message' in error))
			return undefined;

		const zodJson = (error as { message: string }).message;

		try {
			const { code, field, minimum, maximum, ...params } = JSON.parse(
				zodJson,
			) as ZodErrorPayload;

			const labelKey = `${field}.label`;

			const fieldName =
				namespace && fieldT.has(labelKey as never)
					? fieldT(labelKey as never)
					: field;

			return t(
				code as never,
				{
					field: fieldName,
					min: minimum,
					max: maximum,
					...params,
				} as never,
			);
		} catch {
			return zodJson;
		}
	};
};
