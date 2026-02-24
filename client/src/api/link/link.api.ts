import { CreateLinkDto } from '@/dto';
import { ILink } from '@/types';
import api from '../axios.api';

export const createLink = async (dto: CreateLinkDto) =>
	(await api.post<ILink>('/v1/links', dto)).data;
