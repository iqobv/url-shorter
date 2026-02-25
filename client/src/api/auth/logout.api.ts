import api from '../axios.api';

export const logout = async () => await api.post('/v1/auth/logout');
