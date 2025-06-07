import apiClient from './apiClient';

export const getProfile = async () => {
  const response = await apiClient.get('/profile');
  return response.data;
};

export const updateProfile = async (profileData: {
  name?: string;
  phone_number?: string;
  picture?: string;
}) => {
  const response = await apiClient.put('/profile', profileData);
  return response;
};

export const deleteAccount = async () => {
  const response = await apiClient.delete('/profile/delete-account');
  return response;
};
