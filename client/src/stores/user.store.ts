import { IUser } from '@/types';
import { create } from 'zustand';

interface UserState {
	user: IUser | null;
	isLoggedIn: boolean;
}

interface UserActions {
	setUser(user: IUser | null): void;
	logout(): void;
}

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	isLoggedIn: false,
	setUser: (user) =>
		set(() => ({
			user,
			isLoggedIn: !!user,
		})),
	logout: () =>
		set(() => ({
			user: null,
			isLoggedIn: false,
		})),
}));

export const useGetUser = () => useUserStore((state) => state.user);
export const useIsLoggedIn = () => useUserStore((state) => state.isLoggedIn);
export const useSetUser = () => useUserStore((state) => state.setUser);
export const useLogout = () => useUserStore((state) => state.logout);
