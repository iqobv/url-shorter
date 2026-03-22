import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getDefaultServerWorkspace } from './api';
import { PRIVATE_PAGES, PUBLIC_PAGES } from './config';
import { routing } from './i18n';
import { IApiErrorResponse } from './types';

const i18nMiddleware = createMiddleware(routing);

export default async function proxy(req: NextRequest) {
	const response = i18nMiddleware(req);

	if (!response.ok) return response;

	const rewriteHeader = response.headers.get('x-middleware-rewrite');
	const currentUrl = new URL(rewriteHeader || req.url);
	const [, locale, ...rest] = currentUrl.pathname.split('/');
	const pathnameWithoutLocale = '/' + rest.join('/');

	let redirectPath: string | null = null;

	if (
		pathnameWithoutLocale === PRIVATE_PAGES.DASHBOARD ||
		pathnameWithoutLocale === `${PRIVATE_PAGES.DASHBOARD}/`
	) {
		const hasRefreshCookie = req.cookies.has('refreshToken');

		if (hasRefreshCookie) {
			try {
				const workspace = await getDefaultServerWorkspace(
					req.cookies.toString(),
				);

				redirectPath = workspace?.id
					? PRIVATE_PAGES.DASHBOARD_WORKSPACE(workspace.id)
					: PRIVATE_PAGES.ONBOARDING;
			} catch (error: unknown) {
				const apiError = error as IApiErrorResponse;
				if (apiError.code === 'DEFAULT_WORKSPACE_NOT_FOUND') {
					redirectPath = PRIVATE_PAGES.ONBOARDING;
				}
			}
		} else {
			redirectPath = PUBLIC_PAGES.LOGIN;
		}
	}

	if (redirectPath) {
		return NextResponse.redirect(
			new URL(`/${locale}${redirectPath}`, req.url),
			{ headers: response.headers },
		);
	}

	return response;
}

export const config = {
	matcher: ['/', '/(uk|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
