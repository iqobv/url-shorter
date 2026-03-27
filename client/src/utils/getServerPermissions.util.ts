'use server';

import { getServerUserPermissions as getApiServerUserPermissions } from '@/api';
import { PUBLIC_PAGES } from '@/config';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export const getServerUserPermissions = cache(async (workspaceId: string) => {
	const header = await headers();
	const cookieStore = await cookies();
	const hasRefreshToken = cookieStore.has('refreshToken');

	const updateCookies = header.get('x-shorthand-cookies');
	const cookieString = updateCookies || cookieStore.toString();

	if (!hasRefreshToken) {
		redirect(PUBLIC_PAGES.LOGIN);
	}

	const userPermissions = await getApiServerUserPermissions(
		workspaceId,
		cookieString,
	);

	return userPermissions;
});
