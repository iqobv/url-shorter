'use client';

import { claimLinks, getUser } from '@/api';
import { QUERY_KEYS } from '@/config';
import { ClaimLinkDto } from '@/dto';
import { useClearLinks, useGetLinks, useSetUser } from '@/stores';
import { IUser } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PropsWithChildren, useEffect } from 'react';

interface UserProviderProps extends PropsWithChildren {
	initialUser?: IUser | null;
	hasRefreshToken?: boolean;
}

const UserProvider = ({
	initialUser,
	hasRefreshToken,
	children,
}: UserProviderProps) => {
	const setUser = useSetUser();

	const links = useGetLinks();
	const clearLinks = useClearLinks();

	const { data: user } = useQuery({
		queryKey: QUERY_KEYS.AUTH.USER,
		queryFn: getUser,
		initialData:
			initialUser?.id && initialUser.emailVerified ? initialUser : undefined,
		retry: false,
		staleTime: 0,
		enabled: !!hasRefreshToken,
	});

	const { mutate } = useMutation({
		mutationKey: QUERY_KEYS.LINK.CLAIM_LINKS(links, user?.id || ''),
		mutationFn: (links: ClaimLinkDto[]) => claimLinks(links),
		onSuccess: () => {
			clearLinks();
		},
	});

	useEffect(() => {
		if (user?.id && user.emailVerified) {
			setUser(user);
			if (links.length > 0) {
				const mappedLinks: ClaimLinkDto[] = links.map((link) => ({
					linkId: link.id,
					claimToken: link.claimToken || '',
				}));

				mutate(mappedLinks);
			}
		}
	}, [user, setUser, mutate, links]);

	return <>{children}</>;
};

export default UserProvider;
