import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export const authService = {
  login: (username: string, password: string) =>
    api.post('/user/signin', { username, password }),
  register: (username: string, password: string) =>
    api.post('/user/signup', { username, password }),
  getMetadata: () => api.get('/user/metadata'),
  getAvatars: () => api.get('/user/avatars'),
};

export const spaceService = {
  createSpace: (name: string, mapId: string) =>
    api.post('/space/create', { name, mapId }),
  getMySpaces: () => api.get('/space/my-spaces/all'),
  getSpace: (spaceId: string) => api.get(`/space/${spaceId}`),
  addElement: (elementData: any) => api.post('/space/add-element', elementData),
  deleteElement: (elementId: string) =>
    api.delete(`/space/delete-element/${elementId}`),
};