'use client';

import { Button } from '@/components/ui';
import { IconType } from 'react-icons';

interface SocialButtonProps {
	icon: IconType;
	onClick: () => void;
	text: string;
}

const SocialButton = ({ icon, onClick, text }: SocialButtonProps) => {
	return (
		<Button
			fullWidth
			onClick={onClick}
			variant="outline"
		>
			{icon({ size: 20 })}
			{text}
		</Button>
	);
};

export default SocialButton;
