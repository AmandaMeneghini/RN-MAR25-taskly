import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator, View } from 'react-native';
import Keychain from 'react-native-keychain';
import AppNavigator from './src/Navigation/index';
import { isTokenExpired, refreshAuthToken, removeToken } from './src/Utils/authUtils';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('[App.tsx] Inicializando o aplicativo e verificando token...');
        const credentials = await Keychain.getGenericPassword();

        if (!credentials || !credentials.password) {
          console.log('[App.tsx] Nenhum token encontrado. Usuário não autenticado.');
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        let idToken: string | null = null;
        let isOldFormat = false;

        try {
          const parsedData = JSON.parse(credentials.password);
          idToken = parsedData.idToken || parsedData.id_token;
        } catch (e) {
          console.warn('[App.tsx] Formato de token antigo (não-JSON) detectado.');
          isOldFormat = true;
          idToken = credentials.password;
        }

        if (!idToken) {
          console.warn('[App.tsx] Token inválido encontrado. Deslogando.');
          await removeToken();
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        if (isTokenExpired(idToken)) {
          console.log('[App.tsx] Token expirado. Tentando renovar...');
          try {
            await refreshAuthToken();
            console.log('[App.tsx] Token renovado com sucesso!');
            setIsAuthenticated(true);
          } catch (refreshError) {
            console.log('[App.tsx] Falha ao renovar o token. Deslogando usuário.', refreshError);
            setIsAuthenticated(false);
          }
        } else {
          console.log('[App.tsx] Token válido encontrado. Usuário autenticado.');
          if (isOldFormat) {

            console.log('[App.tsx] Token antigo ainda é válido, mas será limpo para forçar migração no próximo login.');
            await removeToken();
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
          }
        }

      } catch (error) {
        console.log('[App.tsx] Erro geral ao inicializar o aplicativo:', error);
        Alert.alert('Erro', 'Não foi possível inicializar o aplicativo. Por favor, tente novamente.');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5B3CC4" />
      </View>
    );
  }

  return <AppNavigator isAuthenticated={isAuthenticated} />;
};

export default App;
