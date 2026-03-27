import axios, { AxiosResponse } from 'axios';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getDefaultServerWorkspace } from './api';
import { PRIVATE_PAGES, PUBLIC_PAGES } from './config';
import { routing } from './i18n';
import { IApiErrorResponse } from './types';

const i18nMiddleware = createMiddleware(routing);

export default async function proxy(req: NextRequest): Promise<NextResponse> {
	const response = i18nMiddleware(req);

	const isRedirect = response.status >= 300 && response.status < 400;
	if (isRedirect) return response;

	const rewriteHeader = response.headers.get('x-middleware-rewrite');
	const currentUrl = new URL(rewriteHeader || req.url);
	const segments = currentUrl.pathname.split('/');
	const locale = segments[1] || 'en';
	const pathnameWithoutLocale = '/' + segments.slice(2).join('/');

	let redirectPath: string | null = null;
	let activeCookies = req.cookies.toString();

	const accessToken = req.cookies.get('accessToken')?.value;
	const refreshToken = req.cookies.get('refreshToken')?.value;

	if (!accessToken && refreshToken) {
		try {
			const refreshRes: AxiosResponse = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh`,
				{},
				{
					headers: { Cookie: `refreshToken=${refreshToken}` },
					withCredentials: true,
				},
			);

			const setCookie = refreshRes.headers['set-cookie'];
			if (setCookie) {
				activeCookies = setCookie.join('; ');
				setCookie.forEach((c) => response.headers.append('Set-Cookie', c));
				req.headers.set('Cookie', activeCookies);
			}
		} catch {
			redirectPath = PUBLIC_PAGES.LOGIN;
		}
	}

	const isDashboard =
		pathnameWithoutLocale === PRIVATE_PAGES.DASHBOARD ||
		pathnameWithoutLocale === `${PRIVATE_PAGES.DASHBOARD}/`;

	if (isDashboard && !redirectPath) {
		if (refreshToken || activeCookies.includes('refreshToken')) {
			try {
				const workspace = await getDefaultServerWorkspace(activeCookies);

				redirectPath = workspace?.id
					? PRIVATE_PAGES.DASHBOARD_WORKSPACE(workspace.id)
					: PRIVATE_PAGES.ONBOARDING;
			} catch (error: unknown) {
				const apiError = error as IApiErrorResponse;
				redirectPath =
					apiError.code === 'DEFAULT_WORKSPACE_NOT_FOUND'
						? PRIVATE_PAGES.ONBOARDING
						: PUBLIC_PAGES.LOGIN;
			}
		} else {
			redirectPath = PUBLIC_PAGES.LOGIN;
		}
	}

	if (redirectPath) {
		const url = new URL(`/${locale}${redirectPath}`, req.url);
		const redirectResponse = NextResponse.redirect(url);
		response.headers.forEach((v, k) => redirectResponse.headers.set(k, v));
		return redirectResponse;
	}

	const finalResponse = NextResponse.next({
		request: {
			headers: new Headers(req.headers),
		},
	});

	response.headers.forEach((v, k) => finalResponse.headers.set(k, v));
	finalResponse.headers.set('x-shorthand-cookies', activeCookies);

	return finalResponse;
}

export const config = {
	matcher: ['/', '/(uk|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
