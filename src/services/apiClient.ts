import axios from 'axios';
import {API_BASE_URL} from '../env';
import {getToken} from '../Utils/authUtils';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  async config => {

    const publicRoutes = ['/auth/register', '/auth/login'];

    if (publicRoutes.includes(config.url || '')) {
      return config;
    }

    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default apiClient;
