import axios from 'axios';
import { API_URL } from '../constant';

const spaceApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const createSpace = async (space: any) => {
  const response = await spaceApi.post(`${API_URL}/space/create`, space);
  return response.data;
};

export const deleteSpace = async (spaceId: string) => {
  const response = await spaceApi.delete(`${API_URL}/space/${spaceId}`);
  return response.data;
};

export const getMyExistingSpaces = async () => {
  const response = await spaceApi.get(`${API_URL}/space/my-spaces/all`);
  return response.data;
};

export const getSpace = async (spaceId: string) => {
  const response = await spaceApi.get(`${API_URL}/space/${spaceId}`);
  return response.data;
};

export const addElement = async (element: any) => {
  const response = await spaceApi.post(`${API_URL}/space/add-element`, element);
  return response.data;
};

export const deleteElement = async (elementId: string) => {
  const response = await spaceApi.delete(`${API_URL}/space/delete-element/${elementId}`);
  return response.data;
};

export const getAllElements = async () => {
  const response = await spaceApi.get(`${API_URL}/space/elements/all`);
  return response.data;
};

