import api from '../axios.api';

export const logout = async () => await api.post<boolean>('/v1/auth/logout');
