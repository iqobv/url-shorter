import { messages } from '@/i18n';
import { NestedKeyOf } from 'next-intl';

export type TMessages = NestedKeyOf<typeof messages>;
