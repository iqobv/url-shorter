'use client';

import { useCanPerformAction } from '@/stores';
import { Permissions } from '@/types';
import React from 'react';

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
	fallback = null,
	loader = null,
	showLoader = false,
}: GuardProps) => {
	const { can, isLoaded } = useCanPerformAction(permissions);

	if (!isLoaded) {
		if (loader || showLoader) {
			return <>{loader}</>;
		}

		return null;
	}

	if (!can) {
		return <>{fallback}</>;
	}

	return <>{children}</>;
};

export default Guard;
