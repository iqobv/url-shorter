import { CreateRole } from '@/components/dashboard/roles';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Create Role',
};

export default function NewRolePage() {
	return (
		<div>
			<CreateRole />
		</div>
	);
}
