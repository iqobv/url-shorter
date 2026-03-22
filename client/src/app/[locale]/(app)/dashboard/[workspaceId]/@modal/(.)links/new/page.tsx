import { CreateLinkModal } from '@/components/dashboard/links';
import { TPageParams } from '@/types';
import { generateTitle } from '@/utils';

export async function generateMetadata({ params }: { params: TPageParams }) {
	return generateTitle(params, 'metadata.pages.dashboard.links.linksNew');
}

export default function ModalNewLinkPage() {
	return <CreateLinkModal />;
}
