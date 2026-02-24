import { RegisterDto } from '@/dto';
import { ICodeResponse } from '@/types';
import api from '../axios.api';

export const register = async (dto: RegisterDto) =>
	(await api.post<ICodeResponse>('/v1/auth/register', dto)).data;
