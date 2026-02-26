import { IAllLinks } from '@/types';
import api from '../axios.api';

export const getAllLinks = async (query: {
	page: number;
	limit: number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
}) =>
	(
		await api.get<IAllLinks>('/v1/links/me', {
			params: query,
		})
	).data;
