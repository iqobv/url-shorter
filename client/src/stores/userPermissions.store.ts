import { PERMISSIONS } from '@/constants';
import { Permissions } from '@/types';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

interface UserPermissionsState {
	permissions: Permissions[];
	isLoaded: boolean;
}

interface UserPermissionsActions {
	setPermissions: (permissions: Permissions[]) => void;
	canPerformAction: (requiredPermissions: Permissions[]) => boolean;
	clearPermissions: () => void;
}

export type UserPermissionsStore = UserPermissionsState &
	UserPermissionsActions;

export const useUserPermissionsStore = create<UserPermissionsStore>(
	(set, get) => ({
		permissions: [],
		isLoaded: false,
		setPermissions: (permissions: Permissions[]) =>
			set({ permissions, isLoaded: true }),
		canPerformAction: (requiredPermissions: Permissions[]) => {
			const { permissions, isLoaded } = get();

			if (!isLoaded) return false;

			if (permissions.includes(PERMISSIONS.ADMIN.ALL)) return true;

			return requiredPermissions.some((perm) => permissions.includes(perm));
		},
		clearPermissions: () => set({ permissions: [], isLoaded: false }),
	}),
);

export const useGetPermissions = () =>
	useUserPermissionsStore((state) => state.permissions);
export const useSetPermissions = () =>
	useUserPermissionsStore((state) => state.setPermissions);
export const useClearPermissions = () =>
	useUserPermissionsStore((state) => state.clearPermissions);
export const useCanPerformAction = (requiredPermissions: Permissions[]) => {
	return useUserPermissionsStore(
		useShallow((state) => ({
			can: state.canPerformAction(requiredPermissions),
			isLoaded: state.isLoaded,
		})),
	);
};
