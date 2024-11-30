import axios from 'axios';
import { API_URL } from '../constant';

const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const login = async (email: string, password: string) => {
  const response = await authApi.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const register = async (email: string, password: string, role: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, { email, password,role });
  return response.data;
};

export const updateMetadata = async (metadata: any) => {
  const response = await authApi.put(`${API_URL}/auth/update-metadata`, metadata);
  return response.data;
};

export const getAvailableAvatars = async () => {
  const response = await authApi.get(`${API_URL}/auth/avatars`);
  return response.data;
};

export const getUsersMetadata = async () => {
  const response = await authApi.get(`${API_URL}/auth/metadata`);
  return response.data;
};