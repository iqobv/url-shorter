import { LogoutButton } from '@/components/settings';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Settings',
};

export default function SettingsPage() {
	return (
		<div>
			<LogoutButton />
		</div>
	);
}
