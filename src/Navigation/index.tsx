import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from '../Screens/Register';
import Menu from '../Screens/Menu/MainMenu';
import TermosPage from '../Screens/Menu/TermsMenu';
import AvatarSelector from '../Screens/AvatarSelector';
import PreferencesMenu from '../Screens/PreferencesMenu';
import EditPersonalInfoScreen from '../Screens/EditPersonalInfo/EditPersonalInfoScreen';
import Login from '../Screens/Login/index';
import BottomTabNavigator from '../components/BottomTabNavigator';
import TaskDetailsScreen from '../Screens/TaskDetails';

import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'MainApp' : 'Login'}
        screenOptions={{ headerShown: false }}
      >
        {/* Tela de Login */}
        <Stack.Screen name="Login" component={Login} />

        {/* Tela de detalhes da tarefa */}
        <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />

        {/* Tela de cadastro */}
        <Stack.Screen name="Register" component={Register} />

        {/* Tela de menu */}
        <Stack.Screen name="Menu" component={Menu} />

        {/* Tela de Termos e Regulamentos */}
        <Stack.Screen name="Regulamentos" component={TermosPage} />

        {/* Tela de seleção de avatar */}
        <Stack.Screen name="AvatarSelector" component={AvatarSelector} />

        {/* Tela de seleção de preferências de tema */}
        <Stack.Screen name="PreferencesMenu" component={PreferencesMenu} />

        {/* Tela de edição de informações pessoais */}
        <Stack.Screen name="EditPersonalInfo" component={EditPersonalInfoScreen} />

        {/* Navegação principal (com abas) */}
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from '../Screens/Register';
import Menu from '../Screens/Menu/MainMenu';
import TermosPage from '../Screens/Menu/TermsMenu';
import AvatarSelector from '../Screens/AvatarSelector';
import PreferencesMenu from '../Screens/PreferencesMenu';
import EditPersonalInfoScreen from '../Screens/EditPersonalInfo/EditPersonalInfoScreen';
import Login from '../Screens/Login/index';
import BottomTabNavigator from '../components/BottomTabNavigator';
import TaskDetailsScreen from '../Screens/TaskDetails';

import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'MainApp' : 'Login'}
        screenOptions={{ headerShown: false }}
      >
        {/* Tela de Login */}
        <Stack.Screen name="Login" component={Login} />

        {/* Tela de detalhes da tarefa */}
        <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />

        {/* Tela de cadastro */}
        <Stack.Screen name="Register" component={Register} />

        {/* Tela de menu */}
        <Stack.Screen name="Menu" component={Menu} />

        {/* Tela de Termos e Regulamentos */}
        <Stack.Screen name="Regulamentos" component={TermosPage} />

        {/* Tela de seleção de avatar */}
        <Stack.Screen name="AvatarSelector" component={AvatarSelector} />

        {/* Tela de seleção de preferências de tema */}
        <Stack.Screen name="PreferencesMenu" component={PreferencesMenu} />

        {/* Tela de edição de informações pessoais */}
        <Stack.Screen name="EditPersonalInfo" component={EditPersonalInfoScreen} />

        {/* Navegação principal (com abas) */}
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
