import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  ImageSourcePropType,
} from 'react-native';

import * as Keychain from 'react-native-keychain';
import styles from './style';
import Input from '../../components/input';
import Button from '../../components/button';
import Fonts from '../../Theme/fonts';
import LoginErrorModal from './Modal';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { loginUserAPI } from '../../services/authService';
import { updateProfile } from '../../services/profileService';

const checkedIcon: ImageSourcePropType = require('../../Assets/icons/CheckSquare-2.png');
const uncheckedIcon: ImageSourcePropType = require('../../Assets/icons/CheckSquare-1.png');

const PENDING_PROFILE_UPDATE_KEY = '@pendingProfileUpdate';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const handlePendingProfileUpdate = async () => {
  try {
    const pendingDataJSON = await AsyncStorage.getItem(PENDING_PROFILE_UPDATE_KEY);

    if (pendingDataJSON) {
      console.log('[Login] Dados de perfil pendentes encontrados! Tentando atualizar o backend...');
      const pendingData = JSON.parse(pendingDataJSON);

      await updateProfile({
        name: pendingData.name,
        phone_number: pendingData.phone_number,
        picture: pendingData.picture,
      });

      console.log('[Login] Perfil pendente (do cadastro) atualizado no backend com sucesso!');

      await AsyncStorage.removeItem(PENDING_PROFILE_UPDATE_KEY);
      console.log('[Login] Dados de perfil pendentes removidos do AsyncStorage.');
    } else {
      console.log('[Login] Nenhum perfil pendente para atualizar.');
    }
  } catch (error) {
    console.log('[Login] Erro ao processar atualização de perfil pendente:', error);

    await AsyncStorage.removeItem(PENDING_PROFILE_UPDATE_KEY);
  }
};


const Login: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [checkboxImage, setCheckboxImage] =
    useState<ImageSourcePropType>(uncheckedIcon);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadRememberedEmail = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('rememberedEmail');
        if (savedEmail) {
          setEmail(savedEmail);
          setRememberMe(true);
          setCheckboxImage(checkedIcon);
        } else {
          setRememberMe(false);
          setCheckboxImage(uncheckedIcon);
        }
      } catch (error) {
        console.error('Erro ao carregar e-mail salvo:', error);
      }
    };

    loadRememberedEmail();
  }, []);

  const handleEmailChange = useCallback(
    (text: string) => {
      setEmail(text);
      setErrors(prevErrors => ({...prevErrors, email: undefined}));
    },
    [setEmail, setErrors],
  );

  const handlePasswordChange = useCallback(
    (text: string) => {
      setPassword(text);
      setErrors(prevErrors => ({...prevErrors, password: undefined}));
    },
    [setPassword, setErrors],
  );

  const handleRememberMe = (): void => {
    const newState = !rememberMe;
    console.log('Alterando estado de "Lembrar de mim":', newState);
    setRememberMe(newState);
    setCheckboxImage(newState ? checkedIcon : uncheckedIcon);
  };

  const validateInputs = (): boolean => {
    let isValid = true;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrors(prev => ({...prev, email: 'E-mail inválido'}));
        isValid = false;
    }
    if (!password || password.length < 6) {
        setErrors(prev => ({...prev, password: 'A senha deve ter no mínimo 6 caracteres'}));
        isValid = false;
    }
    return isValid;
  };

  const handleLogin = async () => {
    setErrors({});
    if (!validateInputs()) {
      return;
    }

    setIsSubmitting(true);
    try {

      const response = await loginUserAPI({ email, password });

      const {id_token, refresh_token} = response.data;

      const tokenDataToStore = {
        idToken: id_token,
        refreshToken: refresh_token,
      };

      await Keychain.setGenericPassword('auth', JSON.stringify(tokenDataToStore));
      console.log('[Login] Token salvo no Keychain no formato JSON correto:', tokenDataToStore);

      if (rememberMe) {
        await AsyncStorage.setItem('rememberedEmail', email);
      } else {
        await AsyncStorage.removeItem('rememberedEmail');
      }

      await handlePendingProfileUpdate();

      navigation.reset({index: 0, routes: [{name: 'MainApp'}]});

    } catch (error) {
      console.log('[Login] Erro durante o login:', error);
      setErrorMessage('E-mail e/ou senha incorretos');
      setIsErrorModalVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('Register');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Image
          source={require('../../Assets/Images/Logo.png')}
          style={styles.logo}
        />
        <Input
          label="E-mail"
          value={email}
          onChangeText={handleEmailChange}
          error={errors.email}
          containerStyle={styles.inputSpacing}
        />
        <Input
          label="Senha"
          value={password}
          onChangeText={handlePasswordChange}
          error={errors.password}
          secureTextEntry
          containerStyle={styles.inputSpacing}
        />
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={handleRememberMe}>
            <Image source={checkboxImage} style={styles.checkboxIcon} />
          </TouchableOpacity>
          <Text style={styles.textCheckbox}>Lembrar de mim</Text>
        </View>
      </View>
      <Button
        title="ENTRAR"
        fontFamily={Fonts.Roboto60020.fontFamily}
        textColor="#FFFFFF"
        backgroundColor="#5B3CC4"
        width="100%"
        style={styles.buttonEnter}
        onPress={handleLogin}
        loading={isSubmitting}
        disabled={isSubmitting}
      />
      <Button
        title="CRIAR CONTA"
        fontFamily={Fonts.Roboto60020.fontFamily}
        textColor="#5B3CC4"
        borderWidth={2}
        borderColor="#5B3CC4"
        backgroundColor="transparent"
        width="100%"
        style={styles.buttonCreate}
        onPress={handleCreateAccount}
      />
      <LoginErrorModal
        visible={isErrorModalVisible}
        title="Ops! Ocorreu um problema"
        description={errorMessage}
        onClose={() => setIsErrorModalVisible(false)}
      />
    </ScrollView>
  );
};

export default Login;
