import {
	LanguageSwitcher,
	LogoutButton,
	ThemeSwitcher,
} from '@/components/settings';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Settings',
};

export default function SettingsPage() {
	return (
		<div>
			<LogoutButton />
			<ThemeSwitcher />
			<LanguageSwitcher />
		</div>
	);
}
