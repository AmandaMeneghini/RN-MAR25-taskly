import * as Keychain from 'react-native-keychain';
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshUserTokenAPI } from '../services/authService';

export const setBiometryEnabled = async (enabled: boolean) => {
  try {
    await AsyncStorage.setItem('isBiometryEnabled', JSON.stringify(enabled));
    console.log(`Biometria ${enabled ? 'ativada' : 'desativada'}.`);
  } catch (error) {
    console.log('Erro ao salvar estado da biometria:', error);
  }
};

export const isBiometryEnabled = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem('isBiometryEnabled');
    return value ? JSON.parse(value) : false;
  } catch (error) {
    console.log('Erro ao recuperar estado da biometria:', error);
    return false;
  }
};

export const isBiometrySupported = async (): Promise<boolean> => {
  try {
    const biometryType = await Keychain.getSupportedBiometryType();
    return !!biometryType;
  } catch (error) {
    console.log('Erro ao verificar suporte à biometria:', error);
    return false;
  }
};

export const storeToken = async (idToken: string, refreshToken?: string) => {
  try {
    if (!idToken) {
      throw new Error('idToken é obrigatório para armazenar os tokens.');
    }
    const tokenData = {
      idToken: idToken,
      refreshToken: refreshToken,
    };
    await Keychain.setGenericPassword('auth', JSON.stringify(tokenData));
    console.log('[authUtils] Tokens armazenados no formato JSON:', tokenData);
  } catch (error) {
    console.log('[authUtils] Erro ao salvar os tokens em formato JSON:', error);
    throw error;
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();

    if (!credentials || !credentials.password) {
      console.log('[authUtils] Nenhum token encontrado no Keychain.');
      return null;
    }

    try {
      const parsedData = JSON.parse(credentials.password);
      const token = parsedData.idToken || parsedData.id_token;
      if (!token) {
        console.warn(
          '[authUtils] JSON no Keychain, mas sem idToken/id_token.',
          parsedData,
        );
        return null;
      }
      console.log('[authUtils] idToken recuperado do Keychain com sucesso.');
      return token;
    } catch (e) {
      console.warn(
        '[authUtils] Formato de token antigo (não-JSON) detectado em getToken. Retornando bruto.',
      );
      return credentials.password;
    }
  } catch (error) {
    console.log('[authUtils] Erro ao recuperar token:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await Keychain.resetGenericPassword();
    console.log('[authUtils] Token removido com sucesso!');
  } catch (error) {
    console.log('[authUtils] Erro ao remover token:', error);
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
    console.log(
      '[authUtils] Erro ao verificar validade do token:',
      error,
      token,
    );
    return true;
  }
};

export const refreshAuthToken = async (): Promise<string> => {
  try {
    const credentials = await Keychain.getGenericPassword();

    if (!credentials || !credentials.password) {
      throw new Error(
        'Nenhuma credencial encontrada no Keychain para renovar.',
      );
    }

    let refreshToken;
    try {
      const parsedData = JSON.parse(credentials.password);
      refreshToken = parsedData.refreshToken;
    } catch (e) {
      console.warn(
        '[authUtils] Formato de token antigo detectado ao tentar renovar. Usando credentials.username como refreshToken.',
      );
      refreshToken = credentials.username;
    }

    if (!refreshToken) {
      throw new Error('RefreshToken inválido ou não encontrado.');
    }

    console.log(
      '[authUtils] Refresh token usado para renovar o token:',
      refreshToken,
    );

    const response = await refreshUserTokenAPI(refreshToken);
    
    const {idToken, refreshToken: newRefreshToken} = response.data;

    await storeToken(idToken, newRefreshToken);

    return idToken;
  } catch (error) {
    console.log('[authUtils] Erro ao renovar o token:', error);
    await removeToken();
    throw error;
  }
};
