import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  ImageSourcePropType,
} from 'react-native';
import axios from 'axios';
import {API_BASE_URL} from '../../env';
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

const checkedIcon: ImageSourcePropType = require('../../Assets/icons/CheckSquare-2.png');
const uncheckedIcon: ImageSourcePropType = require('../../Assets/icons/CheckSquare-1.png');

const PENDING_PROFILE_UPDATE_KEY = '@pendingProfileUpdate';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const handlePendingProfileUpdate = async (idToken: string) => {
  try {
    const pendingDataJSON = await AsyncStorage.getItem(PENDING_PROFILE_UPDATE_KEY);

    if (pendingDataJSON) {
      console.log('[Login] Dados de perfil pendentes encontrados! Tentando atualizar o backend...');
      const pendingData = JSON.parse(pendingDataJSON);

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: pendingData.name,
          phone_number: pendingData.phone_number,
          picture: pendingData.picture,
        }),
      });

      if (response.ok) {
        console.log('[Login] Perfil pendente (do cadastro) atualizado no backend com sucesso!');
      } else {
        const errorText = await response.text();
        console.log('[Login] Falha ao atualizar perfil pendente no backend:', errorText);
      }

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
    console.log('Validando inputs...');
    let isValid = true;

    if (!email) {
      setErrors(prevErrors => ({...prevErrors, email: 'Campo obrigatório'}));
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors(prevErrors => ({...prevErrors, email: 'E-mail inválido'}));
      isValid = false;
    }

    if (!password) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Campo obrigatório',
      }));
      isValid = false;
    } else if (password.length < 6) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'A senha deve ter no mínimo 6 caracteres',
      }));
      isValid = false;
    }

    console.log('Inputs válidos:', isValid);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const {id_token, refresh_token} = response.data;

        const tokenDataToStore = {
          idToken: id_token,
          refreshToken: refresh_token,
        };

        await Keychain.setGenericPassword('auth', JSON.stringify(tokenDataToStore));
        console.log('[Login] Token salvo no Keychain no formato JSON correto:', tokenDataToStore);

        if (rememberMe) {
          await AsyncStorage.setItem('rememberedEmail', email);
          console.log('[Login] E-mail salvo para lembrar-me:', email);
        } else {
          await AsyncStorage.removeItem('rememberedEmail');
          console.log('[Login] E-mail removido do lembrar-me.');
        }

        await handlePendingProfileUpdate(id_token);

        navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
      } else {
        setErrorMessage('E-mail e/ou senha incorretos');
        setIsErrorModalVisible(true);
      }
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
        disabled={
          isSubmitting ||
          !!errors.email ||
          !!errors.password ||
          !email ||
          !password
        }
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
