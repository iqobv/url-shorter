import api from '../axios.api';

export const getAllLinks = async () => (await api.get('/v1/links/me')).data;
