'use client';

import { useCanPerformAction } from '@/stores';
import { Permissions } from '@/types';

interface GuardProps {
	children: React.ReactNode;
	permissions: Permissions[];
	fallback?: React.ReactNode;
	loader?: React.ReactNode;
	showLoader?: boolean;
}

const Guard = ({
	children,
	permissions,
	fallback,
	loader,
	showLoader = false,
}: GuardProps) => {
	const { can, isLoaded } = useCanPerformAction(permissions);

	if (!isLoaded && !can && !showLoader) {
		return null;
	}

	if (loader && !isLoaded && !can) {
		return <>{loader}</>;
	}

	if (!can) {
		return <>{fallback || null}</>;
	}

	return <>{children}</>;
};

export default Guard;
