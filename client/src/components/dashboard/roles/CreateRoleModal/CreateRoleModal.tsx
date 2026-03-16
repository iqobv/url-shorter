'use client';

import { Modal } from '@/components/ui';
import { useRouter } from '@/i18n';
import CreateRole from '../CreateRole/CreateRole';

const CreateRoleModal = () => {
	const router = useRouter();

	return (
		<Modal
			withoutTrigger
			renderOnMount
			onClose={() => {
				router.back();
			}}
		>
			<Modal.Content>
				<Modal.Header>
					<h2>Add New Role</h2>
				</Modal.Header>
				<Modal.Body>
					<CreateRole />
				</Modal.Body>
			</Modal.Content>
		</Modal>
	);
};

export default CreateRoleModal;
