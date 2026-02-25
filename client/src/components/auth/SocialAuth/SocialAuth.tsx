'use client';

import Google from './Buttons/Google';
import styles from './SocialAuth.module.scss';

const SocialAuth = () => {
	return (
		<div className={styles['social-auth']}>
			<div className={styles['divider']}>
				<span className={styles['divider__line']}></span>
				<span className={styles['divider__text']}>or</span>
				<span className={styles['divider__line']}></span>
			</div>
			<Google />
		</div>
	);
};

export default SocialAuth;
