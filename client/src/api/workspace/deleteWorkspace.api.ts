import api from '../axios.api';

export const deleteWorkspace = async (id: string) =>
	(await api.delete(`/v1/workspaces/${id}`)).data;
