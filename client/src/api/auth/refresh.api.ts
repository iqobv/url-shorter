import api from '../axios.api';

export const refreshToken = async () => await api.post('/v1/auth/refresh');
