'use client';

import { logout } from '@/api';
import { Button } from '@/components/ui';
import { PUBLIC_PAGES, QUERY_KEYS } from '@/config';
import { useLogout } from '@/stores';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
	const router = useRouter();

	const storeLogout = useLogout();

	const { mutate } = useMutation({
		mutationFn: logout,
		mutationKey: QUERY_KEYS.AUTH.LOGOUT,
		onSuccess: () => {
			router.refresh();
			router.push(PUBLIC_PAGES.HOME);
			storeLogout();
		},
	});

	return (
		<div>
			<Button onClick={() => mutate()}>Logout</Button>
		</div>
	);
};

export default LogoutButton;
