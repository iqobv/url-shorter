import { IUserWorkspaces } from '@/types';
import api from '../axios.api';

export const getAllUserWorkspaces = async () =>
	(await api.get<IUserWorkspaces>('/v1/workspaces/me')).data;
