import { IUser } from '@/types';
import api from '../axios.api';

export const getUser = async () => (await api.get<IUser>('/v1/auth/me')).data;
