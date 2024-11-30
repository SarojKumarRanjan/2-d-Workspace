import axios from 'axios';
import { API_URL } from '../constant';

const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const login = async (username: string, password: string) => {
  const response = await authApi.post(`${API_URL}/user/signin`, { username, password });
  return response.data;
};

export const register = async (username: string, password: string, role: string) => {
  const response = await axios.post(`${API_URL}/user/signup`, { username, password,role });
  return response.data;
};

export const updateMetadata = async (metadata: any) => {
  const response = await authApi.put(`${API_URL}/user/update-metadata`, metadata);
  return response.data;
};

export const getAvailableAvatars = async () => {
  const response = await authApi.get(`${API_URL}/user/avatars`);
  return response.data;
};

export const getUsersMetadata = async () => {
  const response = await authApi.get(`${API_URL}/user/metadata`);
  return response.data;
};