import { IWorkspace } from '@/types';
import api from '../axios.api';

export const getDefaultWorkspace = async () =>
	(await api.get<IWorkspace>('/v1/workspaces/default')).data;

export const getDefaultServerWorkspace = async (cookie: string) =>
	(
		await api.get<IWorkspace>('/v1/workspaces/default', {
			headers: {
				Cookie: cookie,
			},
		})
	).data;
