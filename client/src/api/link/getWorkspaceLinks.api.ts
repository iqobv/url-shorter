import { IAllLinks, IWorkspacesLinksQuery } from '@/types';
import api from '../axios.api';

export const getWorkspaceLinks = async (
	workspaceId: string,
	query: IWorkspacesLinksQuery,
) =>
	(
		await api.get<IAllLinks>(`/v1/links/workspace/${workspaceId}`, {
			params: query,
		})
	).data;
