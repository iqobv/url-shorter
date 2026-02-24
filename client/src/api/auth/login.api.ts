import { LoginDto } from '@/dto';
import api from '../axios.api';

export const login = async (dto: LoginDto) =>
	(await api.post('/v1/auth/login', dto)).data;
