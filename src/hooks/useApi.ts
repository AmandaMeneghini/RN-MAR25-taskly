import axios from 'axios';
import {API_BASE_URL} from '../env';
import {getToken} from '../Utils/authUtils';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(async config => {
  if (config.url === '/auth/register') {
    return config;
  }

  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (data: {
  email: string;
  password: string;
  name: string;
  phone_number: string;
}) => {
  try {
    const response = await api.post('/auth/register', data);
    return response;
  } catch (error) {
    console.log('Erro ao registrar usuário:', error);
    throw error;
  }
};

export const loginUser = async (data: {email: string; password: string}) => {
  try {
    const response = await api.post('/auth/login', data);
    return response;
  } catch (error) {
    console.log('Erro ao realizar login:', error);
    throw error;
  }
};

export default api;