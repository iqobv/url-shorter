'use client';

import * as Flags from 'country-flag-icons/react/3x2';

interface CountryFlagProps {
	countryCode: string;
	className?: string;
	width?: number;
}

export const CountryFlag = ({
	countryCode,
	className,
	width = 24,
}: CountryFlagProps) => {
	const isValidCode = countryCode.toUpperCase() in Flags;

	if (!isValidCode) {
		return <span className={className}>{countryCode}</span>;
	}

	const Flag = Flags[countryCode.toUpperCase() as keyof typeof Flags];

	return (
		<Flag
			title={countryCode}
			className={className}
			width={width}
		/>
	);
};
