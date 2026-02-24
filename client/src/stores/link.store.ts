import { ILinkLocal } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LinkState {
	links: ILinkLocal[];
}

interface LinkActions {
	addLink: (link: ILinkLocal) => void;
	removeLink: (id: string) => void;
	clearLinks: () => void;
}

type LinkStore = LinkState & LinkActions;

export const useLinkStore = create<LinkStore>()(
	persist<LinkStore>(
		(set) => ({
			links: [],
			addLink: (link: ILinkLocal) =>
				set((state) => ({ links: [link, ...state.links] })),
			removeLink: (id: string) =>
				set((state) => ({
					links: state.links.filter((link) => link.id !== id),
				})),
			clearLinks: () => set({ links: [] }),
		}),
		{ name: 'link-storage' },
	),
);

export const useGetLinks = () => useLinkStore((state) => state.links);
export const useAddLink = () => useLinkStore((state) => state.addLink);
export const useRemoveLink = () => useLinkStore((state) => state.removeLink);
export const useClearLinks = () => useLinkStore((state) => state.clearLinks);
