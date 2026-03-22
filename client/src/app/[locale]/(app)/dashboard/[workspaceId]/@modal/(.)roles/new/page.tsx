import { CreateRoleModal } from '@/components/dashboard/roles';
import { TPageParams } from '@/types';
import { generateTitle } from '@/utils';

export async function generateMetadata({ params }: { params: TPageParams }) {
	return generateTitle(params, 'metadata.pages.dashboard.roles.rolesNew');
}

export default function CreateRoleModalPage() {
	return <CreateRoleModal />;
}
