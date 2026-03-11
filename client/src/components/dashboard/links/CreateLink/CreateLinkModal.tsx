'use client';

import { Modal } from '@/components/ui';
import { useRouter } from '@/i18n';
import CreateLink from './CreateLink';

const CreateLinkModal = () => {
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
					<h2>Add New Link</h2>
				</Modal.Header>
				<Modal.Body>
					<CreateLink />
				</Modal.Body>
			</Modal.Content>
		</Modal>
	);
};

export default CreateLinkModal;
