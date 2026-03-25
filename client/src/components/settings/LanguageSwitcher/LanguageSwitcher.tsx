'use client';

import { Button, Dropdown } from '@/components/ui';
import { routing, usePathname, useRouter } from '@/i18n';
import { Locale, useLocale } from 'next-intl';
import { useTransition } from 'react';

const LanguageSwitcher = () => {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();

	const onSelectChange = (nextLocale: Locale) => {
		startTransition(() => {
			router.replace({ pathname }, { locale: nextLocale });
		});
	};

	const languageNames = new Intl.DisplayNames([locale], {
		type: 'language',
	});

	return (
		<div>
			<Dropdown
				value={locale}
				onChange={(val) => onSelectChange(val)}
			>
				<Dropdown.Trigger>
					<Button style={{ textTransform: 'capitalize' }}>
						{languageNames.of(locale)}
					</Button>
				</Dropdown.Trigger>
				<Dropdown.Menu width="content">
					{routing.locales.map((loc) => (
						<Dropdown.Item
							key={loc}
							value={loc}
							asChild
						>
							<div style={{ minWidth: 120, textTransform: 'capitalize' }}>
								{languageNames.of(loc)}
							</div>
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

export default LanguageSwitcher;
