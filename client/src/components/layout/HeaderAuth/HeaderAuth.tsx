import { Logo } from '@/components/icons';
import { PAGES } from '@/config';
import Link from 'next/link';
import styles from './HeaderAuth.module.scss';

const HeaderAuth = () => {
	return (
		<header className={styles['header-auth']}>
			<div className={styles['header-auth__container']}>
				<Link href={PAGES.HOME} className={styles['header-auth__logo']}>
					<Logo width={50} height={50} /> <span>Shortly</span>
				</Link>
			</div>
		</header>
	);
};

export default HeaderAuth;
