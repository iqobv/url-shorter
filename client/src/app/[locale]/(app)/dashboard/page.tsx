import { getDefaultServerWorkspace } from '@/api';
import { PRIVATE_PAGES, PUBLIC_PAGES } from '@/config';
import { IApiErrorResponse } from '@/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
	const cookieStore = await cookies();
	const cookieString = cookieStore.toString();

	if (!cookieStore.has('refreshToken')) {
		redirect(PUBLIC_PAGES.LOGIN);
	}

	const workspace = await getDefaultServerWorkspace(cookieString).catch(
		(e: IApiErrorResponse) => {
			if (e.code === 'DEFAULT_WORKSPACE_NOT_FOUND')
				redirect(PRIVATE_PAGES.ONBOARDING);
		},
	);

	if (!workspace) {
		redirect(PRIVATE_PAGES.ONBOARDING);
	}

	redirect(PRIVATE_PAGES.DASHBOARD_WORKSPACE(workspace.id));
}
