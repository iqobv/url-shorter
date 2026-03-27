'use client';

import { useLocale } from 'next-intl';
import { CountryFlag } from './CountryFlag';

interface LinkAnalyticsCountriesProps {
	name: string;
}

const LinkAnalyticsCountries = ({ name }: LinkAnalyticsCountriesProps) => {
	const locale = useLocale();
	const regionNames = new Intl.DisplayNames([locale], { type: 'region' });

	return (
		<>
			{name === 'Unknown' ? (
				'Unknown'
			) : (
				<>
					<CountryFlag countryCode={name} />
					{regionNames.of(name)}
				</>
			)}
		</>
	);
};

export default LinkAnalyticsCountries;
