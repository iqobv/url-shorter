'use client';

import { Form } from '@/components/ui';
import { useRouter } from '@/i18n';
import { useTranslations } from 'next-intl';
import { ActionTranslationKeys } from '../RoleForm';
import styles from './RoleFormActions.module.scss';

interface RoleFormActionsProps {
	actionTranslationKeys: ActionTranslationKeys;
}

const RoleFormActions = ({ actionTranslationKeys }: RoleFormActionsProps) => {
	const t = useTranslations('role.form');
	const router = useRouter();

	return (
		<Form.Actions className={styles['form-actions']}>
			<Form.Reset
				buttonProps={{ variant: 'ghost', onClick: () => router.back() }}
			>
				{t(actionTranslationKeys.cancel as never)}
			</Form.Reset>
			<Form.Submit>{t(actionTranslationKeys.submit as never)}</Form.Submit>
		</Form.Actions>
	);
};

export default RoleFormActions;
