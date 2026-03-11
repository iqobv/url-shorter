'use client';

import Guard from '@/components/guard/Guard';
import { Button } from '@/components/ui';
import { messages } from '@/i18n';
import { Permissions } from '@/types';
import { NestedKeyOf } from 'next-intl';
import { useTranslations } from 'use-intl';
import styles from './DashboardHeaderActionButton.module.scss';

type ButtonLabelMessage = NestedKeyOf<typeof messages.header.dashboard.buttons>;

interface DashboardHeaderActionButtonProps {
	label: ButtonLabelMessage;
	href: string;
	permissions: Permissions[];
}

const DashboardHeaderActionButton = ({
	label,
	href,
	permissions,
}: DashboardHeaderActionButtonProps) => {
	const t = useTranslations('header.dashboard.buttons');

	return (
		<Guard permissions={permissions}>
			<Button
				variant="outline"
				className={styles['dashboard-header__new-button']}
				href={href}
			>
				{t(label)}
			</Button>
		</Guard>
	);
};

export default DashboardHeaderActionButton;
