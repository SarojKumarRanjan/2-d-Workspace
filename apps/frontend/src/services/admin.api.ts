import axios from 'axios';
import { API_URL } from '../constant';

const adminApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const createElement = async (element: any) => {
  const response = await adminApi.post(`${API_URL}/admin/create-element`, element);
  return response.data;
};

export const updateElement = async (elementId: string, element: any) => {
  const response = await adminApi.put(`${API_URL}/admin/update-element/${elementId}`, element);
  return response.data;

};

export const createAvatar = async (avatar: any) => {
  const response = await adminApi.post(`${API_URL}/admin/create-avatar`, avatar);
  return response.data;
};

export const createMap = async (map: any) => {
  const response = await adminApi.post(`${API_URL}/admin/create-map`, map);
  return response.data;
};




