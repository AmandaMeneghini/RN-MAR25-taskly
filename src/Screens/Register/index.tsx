import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Button from '../../components/button';
import Input from '../../components/input';
import BiometryModal from './BiometryResgister';
import {registerUser} from '../../hooks/useApi';
import styles from './style';
import ReactNativeBiometrics from 'react-native-biometrics';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../Navigation/types';
import { storeToken } from '../../Utils/authUtils';
import { capitalizeName, formatPhoneNumberForInput, cleanPhoneNumber } from '../../Utils/textFormatters';

export default function Register() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { control, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      number: '',
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = watch('password');

  const [loading, setLoading] = useState(false);
  const [showBiometryModal, setShowBiometryModal] = useState(false);
  const [biometryApiLoading, setBiometryApiLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    console.log('Iniciando cadastro com dados validados...');

    const formattedName = capitalizeName(data.name);

    const cleanedPhoneNumber = cleanPhoneNumber(data.number);

    try {
      const response = await registerUser({
        email: data.email,
        password: data.password,
        name: formattedName,
        phone_number: cleanedPhoneNumber,
      });

      console.log('Token retornado no registro:', response.data.idToken);
      console.log('UID retornado no registro:', response.data.uid);

      if (response.status === 200 || response.status === 201) {
        await storeToken(response.data.idToken, response.data.refreshToken); 
        console.log('Cadastro concluído!');
        setShowBiometryModal(true);
      } else {
        Alert.alert('Erro', response.data.error || 'Não foi possível realizar o cadastro.');
      }
    } catch (error: any) {
        if (error.response && error.response.data) {
            Alert.alert('Erro no Cadastro', error.response.data.error || 'Não foi possível realizar o cadastro.');
        } else {
            Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
        }
    } finally {
      setLoading(false);
    }
  };

  const handleBiometryActivate = async () => {
    setBiometryApiLoading(true);
    console.log('Iniciando autenticação biométrica...');
    const rnBiometrics = new ReactNativeBiometrics();

    try {
      const {available} = await rnBiometrics.isSensorAvailable();

      if (!available) {
        Alert.alert('Erro', 'Biometria não disponível neste dispositivo.');
        setBiometryApiLoading(false);
        return;
      }

      const {success} = await rnBiometrics.simplePrompt({
        promptMessage: 'Confirme sua identidade',
      });

      if (success) {
        console.log('Autenticação biométrica bem-sucedida!');
      } else {
        console.log('Autenticação biométrica cancelada pelo usuário.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha na autenticação biométrica.');
    } finally {
      setBiometryApiLoading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex: 1}}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.form}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Image source={require('../../Assets/icons/VectorBack.png')} />
              <Text style={styles.backText}>VOLTAR</Text>
            </TouchableOpacity>
            <Text style={styles.title}>CADASTRO</Text>

            <Controller
              control={control}
              name="name"
              rules={{
                required: 'O nome é obrigatório.',
                validate: value => {
                  const parts = value.trim().split(' ').filter(Boolean);
                  return (parts.length >= 2 && parts[parts.length - 1].length >= 2) || 'Digite o nome completo.';
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Nome Completo"
                  value={value}
                  onChangeText={onChange}
                  onBlur={() => {
                    onBlur();
                    setValue('name', capitalizeName(value), { shouldValidate: true });
                  }}
                  error={errors.name?.message}
                  containerStyle={styles.inputSpacing}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{
                required: 'O e-mail é obrigatório.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'E-mail inválido.'
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="E-mail"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  containerStyle={styles.inputSpacing}
                />
              )}
            />

            <Controller
              control={control}
              name="number"
              rules={{
                required: 'O número é obrigatório.',

                validate: value => cleanPhoneNumber(value).length === 11 || 'Número inválido. Deve conter 11 dígitos.'
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Número"
                  value={value}

                  onChangeText={(text) => onChange(formatPhoneNumberForInput(text))}
                  onBlur={onBlur}
                  error={errors.number?.message}
                  keyboardType="numeric"
                  maxLength={17}
                  containerStyle={styles.inputSpacing}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: 'A senha é obrigatória.',
                minLength: {
                  value: 6,
                  message: 'A senha deve ter pelo menos 6 caracteres.'
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Senha"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  secureTextEntry
                  containerStyle={styles.inputSpacing}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: 'A confirmação de senha é obrigatória.',
                validate: value => value === passwordValue || 'As senhas não coincidem.'
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Confirmar senha"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirmPassword?.message}
                  secureTextEntry
                  containerStyle={styles.inputSpacing}
                />
              )}
            />
          </View>

          <Button
            title="CRIAR CONTA"
            fontFamily="Roboto60020"
            style={styles.createButton}
            onPress={handleSubmit(onSubmit)}
            disabled={loading || !isValid}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      {loading && (
        <View style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }
        ]}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}

      <BiometryModal
        visible={showBiometryModal}
        title="Ative o Desbloqueio por Biometria"
        description="Use sua impressão digital para acessar seu app de tarefas com rapidez e segurança. Se preferir, você ainda poderá usar sua senha sempre que quiser."
        buttonLeftText="Agora não"
        buttonRightText="ATIVAR"
        loading={biometryApiLoading}
        onPressLeft={() => {
          if (!biometryApiLoading) {
            setShowBiometryModal(false);
            const formData = control._formValues;
            navigation.navigate('AvatarSelector', {
              isEditing: false,
              email: formData.email,
              name: capitalizeName(formData.name),
              phone_number: cleanPhoneNumber(formData.number),
            });
          }
        }}
        onPressRight={handleBiometryActivate}
      />
    </View>
  );
}
