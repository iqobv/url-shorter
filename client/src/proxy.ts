import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { routing } from './i18n';

const i18nMiddleware = createMiddleware(routing);

export default function proxy(req: NextRequest) {
	return i18nMiddleware(req);
}

export const config = {
	matcher: ['/', '/(uk|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
