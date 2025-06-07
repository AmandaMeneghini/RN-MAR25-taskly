import apiClient from './apiClient';

interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone_number: string;
}

interface LoginData {
  email: string;
  password: string;
}

/**
 * Register a new user.
 * @param data - The user data to register.
 * @returns The full Axios response.
 */
export const registerUserAPI = async (data: RegisterData) => {
  const response = await apiClient.post('/auth/register', data);
  return response;
};

/**
 * Logs in a user.
 * @param data - The login credentials.
 * @returns The full Axios response.
 */
export const loginUserAPI = async (data: LoginData) => {
  const response = await apiClient.post('/auth/login', data);
  return response;
};

/**
* Renews the authentication token using a refreshToken.
* @param refreshToken - The renewal token.
* @returns The full Axios response containing the new tokens.
*/
export const refreshUserTokenAPI = async (refreshToken: string) => {
  const response = await apiClient.post('/auth/refresh', {refreshToken});
  return response;
};
