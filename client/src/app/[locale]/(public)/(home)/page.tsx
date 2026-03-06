import { CreateLink, LinksList } from '@/components/home';
import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
	const t = await getTranslations('home');

	return (
		<div className="container">
			<p>{t('title')}</p>
			<CreateLink />
			<LinksList />
		</div>
	);
}
