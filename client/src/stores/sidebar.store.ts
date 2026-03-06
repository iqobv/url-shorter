import { create } from 'zustand';

interface SidebarState {
	expanded: boolean;
}

interface SidebarActions {
	toggleExpanded: () => void;
	setExpanded: (value: boolean) => void;
}

export type SidebarStore = SidebarState & SidebarActions;

export const useSidebarStore = create<SidebarStore>((set) => ({
	expanded: false,
	toggleExpanded: () => set((state) => ({ expanded: !state.expanded })),
	setExpanded: (value: boolean) => set({ expanded: value }),
}));

export const useGetExpanded = () => useSidebarStore((state) => state.expanded);
export const useSetExpanded = () =>
	useSidebarStore((state) => state.setExpanded);
export const useToggleExpanded = () =>
	useSidebarStore((state) => state.toggleExpanded);
