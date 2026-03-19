import { Logo } from '@/components/icons';
import { PUBLIC_PAGES } from '@/config';
import { Link } from '@/i18n';
import AuthButtons from './AuthButtons/AuthButtons';
import styles from './HeaderMain.module.scss';

const HeaderMain = () => {
	return (
		<header className={styles['header']}>
			<div className={`${styles['header__container']} container`}>
				<Link
					href={PUBLIC_PAGES.HOME}
					className={styles['header__logo']}
				>
					<Logo
						width={25}
						height={25}
					/>
					<span>Shortly</span>
				</Link>
				<AuthButtons />
			</div>
		</header>
	);
};

export default HeaderMain;
