import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Update this with your actual API base URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

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

export const adminService = {
  createMap: (formData: FormData) => 
    api.post('/admin/create-map', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getMaps: () => api.get('/admin/maps'),
  createElement: (elementData: any) =>
    api.post('/admin/create-element', elementData),
  updateElement: (elementId: string, elementData: any) =>
    api.put(`/admin/update-element/${elementId}`, elementData),
  createAvatar: (formData: FormData) =>
    api.post('/admin/create-avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};