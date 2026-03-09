'use client';

import React, { ReactElement, useState } from 'react';
import { ModalContext } from './ModalContext';
import ModalBody from './parts/ModalBody';
import ModalClose from './parts/ModalClose';
import ModalContent from './parts/ModalContent/ModalContent';
import ModalFooter from './parts/ModalFooter';
import ModalHeader from './parts/ModalHeader/ModalHeader';
import ModalTrigger from './parts/ModalTrigger';

interface ModalProps {
	children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
	const [open, setOpen] = useState(false);

	const openModal = () => setOpen(true);
	const closeModal = () => setOpen(false);

	const childrenArray = React.Children.toArray(children) as ReactElement[];

	const trigger = childrenArray.find((child) => child.type === ModalTrigger);

	const content = childrenArray.find((child) => child.type === ModalContent);

	if (process.env.NODE_ENV === 'development') {
		if (!trigger) {
			throw new Error('Modal must have a Modal.Trigger component as a child.');
		}

		if (!content) {
			throw new Error('Modal must have a Modal.Content component as a child.');
		}
	}

	return (
		<ModalContext.Provider
			value={{ open, onOpen: openModal, onClose: closeModal }}
		>
			{children}
		</ModalContext.Provider>
	);
};

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Close = ModalClose;

export default Modal;
