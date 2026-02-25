'use client';

import SocialAuth from '../SocialAuth/SocialAuth';
import styles from './AuthWrapper.module.scss';

interface AuthWrapperProps {
	title: string;
	form: React.ReactNode;
	bottomNode?: React.ReactNode;
}

const AuthWrapper = ({ title, form, bottomNode }: AuthWrapperProps) => {
	return (
		<div className={styles['auth-wrapper']}>
			<div className={styles['auth-wrapper__container']}>
				<h1 className={styles['auth-wrapper__title']}>{title}</h1>
				{form}
				<SocialAuth />
			</div>
			{bottomNode}
		</div>
	);
};

export default AuthWrapper;
