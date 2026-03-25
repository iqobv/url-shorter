'use client';

import { Button, Dropdown } from '@/components/ui';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
	const t = useTranslations('settings.theme');

	const { theme, setTheme, themes } = useTheme();

	return (
		<div>
			<Dropdown
				value={theme}
				onChange={(val) => setTheme(val)}
			>
				<Dropdown.Trigger>
					<Button>{t('label')}</Button>
				</Dropdown.Trigger>
				<Dropdown.Menu width="content">
					{themes.map((theme) => (
						<Dropdown.Item
							key={theme}
							value={theme}
							asChild
						>
							<div style={{ minWidth: 120 }}>
								{t(`names.${theme}` as never)}
							</div>
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

export default ThemeSwitcher;
