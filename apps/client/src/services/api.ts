/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';


const token = localStorage.getItem('token');
console.log(token)


const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', 
  
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (username: string, password: string) =>{

  
    const response =  api.post('/user/signin', { username, password })
    return response;
  




},
  register: (username: string, password: string,role:string) =>
   {
        const response = api.post('/user/signup', { username, password, role });
        return response;
      
    },
  getMetadata: () => api.get('/user/metadata'),
  getAvatars: () => api.get('/user/avatars'),
  getMaps: () => api.get('/user/maps'),
};

export const spaceService = {
  createSpace: (name: string, mapId: string,dimensions:string) =>
    api.post('/space/create', { name, mapId,dimensions }),
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
  
  createElement: (elementData: any) =>
    api.post('/admin/create-element', elementData,{
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  updateElement: (elementId: string, elementData: any) =>
    api.put(`/admin/update-element/${elementId}`, elementData,{
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  createAvatar: (formData: FormData) =>
    api.post('/admin/create-avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};