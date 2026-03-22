'use server';

import { TMessages, TPageParams } from '@/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const generateTitle = async (
	params: TPageParams,
	namespace: TMessages,
): Promise<Metadata> => {
	const { locale } = await params;

	const t = await getTranslations({ locale, namespace: namespace as never });

	const title = t('title' as never);

	const description = t.has('description' as never)
		? t('description' as never)
		: undefined;

	return {
		title,
		description,
	};
};
