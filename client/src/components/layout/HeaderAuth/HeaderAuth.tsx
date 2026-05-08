import { Logo } from '@/components/icons';
import { PUBLIC_PAGES } from '@/config';
import { Link } from '@/i18n';
import styles from './HeaderAuth.module.scss';

const HeaderAuth = () => {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<Link
					href={PUBLIC_PAGES.HOME}
					className={styles.logo}
				>
					<Logo
						width={50}
						height={50}
					/>
					<span>Shortly</span>
				</Link>
			</div>
		</header>
	);
};

export default HeaderAuth;
