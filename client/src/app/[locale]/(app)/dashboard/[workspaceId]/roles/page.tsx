import { RolesTable } from '@/components/dashboard/roles';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Roles',
};

export default function RolesPage() {
	return (
		<div>
			<RolesTable />
		</div>
	);
}
