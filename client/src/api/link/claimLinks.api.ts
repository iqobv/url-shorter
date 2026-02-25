import { ClaimLinkDto } from '@/dto';
import api from '../axios.api';

export const claimLinks = async (links: ClaimLinkDto[]) =>
	(await api.post<boolean>('/v1/links/claim', { links: links })).data;
