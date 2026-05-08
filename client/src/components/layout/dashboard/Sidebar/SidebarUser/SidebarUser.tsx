'use client';

import { Button } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { useGetUser } from '@/stores';
import { MdOutlineSettings } from 'react-icons/md';
import styles from './SidebarUser.module.scss';

const SidebarUser = () => {
	const user = useGetUser();

	return (
		<div className={styles.user}>
			<p className={styles.username}>{user?.username}</p>
			<Button
				variant="ghost"
				isIcon
				isRounded
				href={PRIVATE_PAGES.SETTINGS}
			>
				<MdOutlineSettings size={20} />
			</Button>
		</div>
	);
};

export default SidebarUser;
