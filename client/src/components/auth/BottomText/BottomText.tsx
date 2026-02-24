'use client';

import { Button } from '@/components/ui';
import { useLocale } from 'next-intl';
import styles from './BottomText.module.scss';

interface BottomTextProps {
	text: string;
	href: string;
	linkText: string;
}

const BottomText = ({ text, href, linkText }: BottomTextProps) => {
	const locale = useLocale();

	return (
		<div className={styles['bottom-text']}>
			<p>{text}</p>
			<Button
				variant="link"
				href={href}
				hrefLang={locale}
				className={styles['bottom-text__link']}
			>
				{linkText}
			</Button>
		</div>
	);
};

export default BottomText;
