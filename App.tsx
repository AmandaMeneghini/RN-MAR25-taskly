import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, View} from 'react-native';
import Keychain from 'react-native-keychain';
import AppNavigator from './src/Navigation/index';
import { isTokenExpired, refreshAuthToken, removeToken } from './src/Utils/authUtils';
import { useTheme, ThemeProvider } from './src/context/ThemeContext';

import SplashScreen from './src/components/SplashScreen';

const AppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { theme, isDarkMode } = useTheme();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('[App.tsx] Inicializando o aplicativo e verificando token...');
        const credentials = await Keychain.getGenericPassword();

        if (!credentials || !credentials.password) {
          console.log('[App.tsx] Nenhum token encontrado. Usuário não autenticado.');
          setIsAuthenticated(false);
          return;
        }

        let idToken: string | null = null;

        try {
          const parsedData = JSON.parse(credentials.password);
          idToken = parsedData.idToken || parsedData.id_token;
        } catch (e) {
          console.warn('[App.tsx] Token em formato antigo (não-JSON) detectado. Limpando para forçar novo login.');
          await removeToken();
          setIsAuthenticated(false);
          return;
        }

        if (!idToken) {
          console.warn('[App.tsx] Token inválido encontrado. Deslogando.');
          await removeToken();
          setIsAuthenticated(false);
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
          setIsAuthenticated(true);
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
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <StatusBar
          backgroundColor={theme.background}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <SplashScreen />
      </View>
    );
  }

  return (
    <>
      <StatusBar 
        backgroundColor={theme.background} 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
      />
      <AppNavigator isAuthenticated={isAuthenticated} />
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
