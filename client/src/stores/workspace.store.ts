import { IWorkspace } from '@/types';
import { create } from 'zustand';

interface WorkspaceState {
	workspace: IWorkspace | null;
}

interface WorkspaceActions {
	setWorkspace: (workspace: IWorkspace) => void;
	clearWorkspace: () => void;
}

export type WorkspaceStore = WorkspaceState & WorkspaceActions;

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
	workspace: null,
	clearWorkspace: () => set({ workspace: null }),
	setWorkspace: (workspace: IWorkspace) => set({ workspace }),
}));

export const useGetWorkspace = () =>
	useWorkspaceStore((state) => state.workspace);
export const useClearWorkspace = () =>
	useWorkspaceStore((state) => state.clearWorkspace);
export const useSetWorkspace = () =>
	useWorkspaceStore((state) => state.setWorkspace);
