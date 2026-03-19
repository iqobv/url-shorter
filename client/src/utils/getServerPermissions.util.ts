'use server';

import { getServerUserPermissions as getApiServerUserPermissions } from '@/api';
import { PUBLIC_PAGES } from '@/config';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export const getServerUserPermissions = cache(async (workspaceId: string) => {
	const cookieStore = await cookies();
	const cookieString = cookieStore.toString();
	const hasRefreshToken = cookieStore.has('refreshToken');

	if (!hasRefreshToken) {
		redirect(PUBLIC_PAGES.LOGIN);
	}

	const userPermissions = await getApiServerUserPermissions(
		workspaceId,
		cookieString,
	);

	return userPermissions;
});
