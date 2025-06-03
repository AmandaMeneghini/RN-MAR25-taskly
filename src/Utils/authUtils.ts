import * as Keychain from 'react-native-keychain';
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../hooks/useApi';

// Salvar o estado de ativação da biometria
export const setBiometryEnabled = async (enabled: boolean) => {
  try {
    await AsyncStorage.setItem('isBiometryEnabled', JSON.stringify(enabled));
    console.log(`Biometria ${enabled ? 'ativada' : 'desativada'}.`);
  } catch (error) {
    console.error('Erro ao salvar estado da biometria:', error);
  }
};

// Recuperar o estado de ativação da biometria
export const isBiometryEnabled = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem('isBiometryEnabled');
    return value ? JSON.parse(value) : false;
  } catch (error) {
    console.error('Erro ao recuperar estado da biometria:', error);
    return false;
  }
};

export const isBiometrySupported = async (): Promise<boolean> => {
  try {
    const biometryType = await Keychain.getSupportedBiometryType();
    return !!biometryType;
  } catch (error) {
    console.error('Erro ao verificar suporte à biometria:', error);
    return false;
  }
};

export const storeToken = async (idToken: string, refreshToken: string) => {
  try {
    if (!refreshToken) {
      throw new Error('O refreshToken é obrigatório para armazenar os tokens.');
    }

    await Keychain.setGenericPassword(refreshToken, idToken);
    console.log('Tokens armazenados com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar os tokens:', error);
    throw error;
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();

    if (!credentials || typeof credentials === 'boolean') {
      console.log('Nenhum token encontrado no Keychain.');
      return null;
    }

    console.log('Token recuperado do Keychain:', credentials.password);
    return credentials.password;
  } catch (error) {
    console.error('Erro ao recuperar token:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await Keychain.resetGenericPassword();
    console.log('Token removido com sucesso!');
  } catch (error) {
    console.error('Erro ao remover token:', error);
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    if (!token || token.split('.').length !== 3) {
      throw new Error('Token inválido ou malformado.');
    }

    const decoded: {exp?: number} = jwtDecode(token);

    if (!decoded.exp) {
      throw new Error('Token não contém a propriedade exp.');
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Erro ao verificar validade do token:', error, token);
    return true; // Considere o token expirado em caso de erro
  }
};

export const refreshAuthToken = async (): Promise<string> => {
  try {
    const credentials = await Keychain.getGenericPassword();

    if (!credentials || typeof credentials === 'boolean') {
      throw new Error('Nenhum token encontrado no Keychain.');
    }

    const refreshToken = credentials.username;

    if (!refreshToken || refreshToken === 'idToken') {
      throw new Error('Refresh token inválido ou não encontrado.');
    }

    console.log('Refresh token usado para renovar o token:', refreshToken);

    const response = await api.post('/refresh', {refreshToken});

    if (response.status !== 200) {
      throw new Error('Erro ao renovar o token.');
    }

    const {idToken, refreshToken: newRefreshToken} = response.data;

    console.log('Token renovado:', idToken);
    console.log('Novo refresh token:', newRefreshToken);

    // Atualizar o token no Keychain
    await Keychain.setGenericPassword(newRefreshToken, idToken);
    return idToken;
  } catch (error) {
    console.error('Erro ao renovar o token:', error);
    throw error;
  }
};
