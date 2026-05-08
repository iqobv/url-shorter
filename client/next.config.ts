import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.i18n.ts');

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.google.com',
				pathname: '/s2/favicons/**',
			},
		],
	},
	allowedDevOrigins: ['lvh.me'],
};

export default withNextIntl(nextConfig);
