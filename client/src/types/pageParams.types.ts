import { Locale } from 'next-intl';

export type TPageParams = Promise<{ locale: Locale; workspaceId?: string }>;
