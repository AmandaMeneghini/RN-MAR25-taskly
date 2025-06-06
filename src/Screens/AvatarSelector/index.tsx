import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  BackHandler,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import type {RootStackParamList} from '../../Navigation/types';
import Button from '../../components/button';
import ProfileHeader from '../../components/ProfileHeader';
import ProgressBar from '../../components/ProgressBar';
import Modal from './Modal';
import styles from './style';
import {API_BASE_URL} from '../../env';
import * as Keychain from 'react-native-keychain';
import { getS3AvatarUrl } from '../../Utils/imageUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const avatarDefinitions = [
  { id: 'avatar_1', borderColor: '#6C4AE4' },
  { id: 'avatar_2', borderColor: '#E4B14A' },
  { id: 'avatar_3', borderColor: '#4AE47B' },
  { id: 'avatar_4', borderColor: '#E44A4A' },
  { id: 'avatar_5', borderColor: '#B89B5B' },
]

const avatars = avatarDefinitions.map(def => ({
  id: def.id,
  source: { uri: getS3AvatarUrl(def.id) },
  borderColor: def.borderColor,
}));

const avatarSize = 100;
const avatarMargin = 12;
const grayBorder = '#D1D5DB';

const PENDING_PROFILE_UPDATE_KEY = '@pendingProfileUpdate';

export default function AvatarSelector() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const route = useRoute<RouteProp<RootStackParamList, 'AvatarSelector'>>();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'AvatarSelector'>
    >();
  const {
    isEditing = false,
    name: routeName,
    phone_number: routePhoneNumber,
  } = route.params || {};

  useEffect(() => {
    const backAction = () => {
      if (!isEditing) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [isEditing]);

  const handleConfirmCadastro = async () => {
    if (!selectedId) {
      Alert.alert('Por favor, selecione um avatar antes de continuar.');
      return;
    }

    try {
      const credentials = await Keychain.getGenericPassword();
      if (!credentials || !credentials.password) {
        console.warn('[Cadastro] Nenhum token no Keychain ao tentar salvar avatar. Isso é inesperado se o registro ocorreu.');

      } else {
        let parsedTokenData;
        try {
          parsedTokenData = JSON.parse(credentials.password);
        } catch (e) {
          console.warn("[Cadastro] Conteúdo do Keychain não é JSON ao tentar adicionar avatar local:", credentials.password, e);
          parsedTokenData = { idToken: credentials.password };
        }

        const updatedKeychainData = {
          ...parsedTokenData,
          avatar: selectedId,
        };
        await Keychain.setGenericPassword('auth', JSON.stringify(updatedKeychainData));
        console.log('[Cadastro] Avatar salvo localmente no Keychain (com token do Admin SDK):', selectedId);
      }
    } catch (keychainError) {
      console.log('[Cadastro] Erro ao tentar atualizar o Keychain localmente com avatar:', keychainError);
    }
    
    try {
      const pendingUpdateData = {
        name: routeName,
        phone_number: routePhoneNumber ? String(routePhoneNumber).replace(/\D/g, '') : null,
        picture: selectedId,
        timestamp: new Date().toISOString(),
      };
      await AsyncStorage.setItem(PENDING_PROFILE_UPDATE_KEY, JSON.stringify(pendingUpdateData));
      console.log('[Cadastro] Dados do perfil (avatar, nome, telefone) salvos no AsyncStorage para atualização pós-login:', pendingUpdateData);
      setIsModalVisible(true);

    } catch (asyncStorageError) {
      console.log('[Cadastro] Erro ao salvar dados do perfil no AsyncStorage:', asyncStorageError);
      Alert.alert(
        'Erro Local',
        'Não foi possível salvar suas escolhas localmente. Por favor, tente novamente ou contate o suporte se o problema persistir.'
      );
    }
  }; // CORRIGIDO: Fechamento da função handleConfirmCadastro

  const handleConfirmEdicao = async () => {
    if (!selectedId) {
      Alert.alert('Por favor, selecione um avatar antes de continuar.');
      return;
    }

    try {
      const credentials = await Keychain.getGenericPassword();

      if (!credentials || !credentials.password) {
        Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        return;
      }
      console.log('[Edição] Conteúdo bruto do Keychain (credentials.password):', credentials.password);

      let parsedTokenData;
      let idTokenForEdit;
      try {
        parsedTokenData = JSON.parse(credentials.password);
        console.log('[Edição] Dados parseados do Keychain:', parsedTokenData);
        idTokenForEdit = parsedTokenData.idToken || parsedTokenData.id_token;
        if (!idTokenForEdit) {
          throw new Error('idToken (ou id_token) não encontrado nos dados do Keychain para edição.');
        }
      } catch (e) {
        console.log("[Edição] Erro ao parsear dados do Keychain ou idToken/id_token faltando:", credentials.password, e);
        Alert.alert('Erro', 'Formato de token local inválido para edição.');
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        return;
      }
      console.log('[Edição] Usando idToken/id_token para API (Bearer):', idTokenForEdit);

      const updatedKeychainDataForEdit = {
        ...parsedTokenData,
        idToken: idTokenForEdit,
        avatar: selectedId,
      };
      await Keychain.setGenericPassword('auth', JSON.stringify(updatedKeychainDataForEdit));
      console.log('[Edição] Avatar e tokens atualizados localmente no Keychain:', selectedId);

      const bodyParaApiEdicao: { picture: string; name?: string; phone_number?: string } = {
        picture: selectedId,
      };
      if (routeName) {
        bodyParaApiEdicao.name = routeName;
      }
      if (routePhoneNumber) {
        const phoneNumberString = String(routePhoneNumber);
        bodyParaApiEdicao.phone_number = phoneNumberString.replace(/\D/g, '');
      }
      console.log('[Edição] Dados para API (PUT /profile):', JSON.stringify(bodyParaApiEdicao));

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${idTokenForEdit}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyParaApiEdicao),
      });

      const responseText = await response.text();

      if (response.ok) {
        console.log('[Edição] Perfil atualizado no backend com sucesso!', responseText);
        setIsModalVisible(true);
      } else {
        console.log('[Edição] Erro ao atualizar perfil no backend:', response.status, responseText);
        Alert.alert(
          'Erro no Servidor (Edição)',
          `Não foi possível atualizar o perfil. Detalhe: ${responseText || response.status}`
        );
      }
    } catch (error) {
      console.log('Erro ao processar a requisição de edição:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao processar sua solicitação de edição.');
    }
  };

  const handleModalClose = () => {
    if (!isModalVisible) return;
    setIsModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [{name: isEditing ? 'MainApp' : 'Login'}],
    });
  };

  const handleAvatarPress = (id: string) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  return (
    <View style={styles.container}>
      {isEditing && (
        <View style={styles.headerContainer}>
          <ProfileHeader
            title="EDIÇÃO DE PERFIL"
            onBackPress={() => navigation.goBack()}
          />
          <ProgressBar progress={1} />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.textAvatar}>SELECIONE SEU AVATAR</Text>
        <Text style={styles.textPick}>(Escolha somente um.)</Text>
      </View>
      <View style={styles.avatarsRow}>
        {avatars.map(avatar => {
          const isSelected = selectedId === avatar.id;
          const isDimmed = selectedId && !isSelected;
          return (
            <TouchableOpacity
              key={avatar.id}
              style={[
                styles.avatarTouchable,
                {
                  borderColor: selectedId
                    ? isSelected
                      ? avatar.borderColor
                      : grayBorder
                    : avatar.borderColor,
                  borderWidth: 3,
                  borderRadius: avatarSize / 2,
                  margin: avatarMargin / 2,
                  overflow: 'hidden',
                  padding: 0,
                  width: avatarSize,
                  height: avatarSize,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => handleAvatarPress(avatar.id)}>
              <Image
                source={avatar.source}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode="cover"
              />
              {isDimmed && (
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                  }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      <Button
        title={isEditing ? 'CONFIRMAR EDIÇÃO' : 'CONFIRMAR SELEÇÃO'}
        fontFamily="Roboto60020"
        backgroundColor="#6C4AE4"
        width={Dimensions.get('window').width * 0.9}
        style={styles.confirmButton}
        onPress={isEditing ? handleConfirmEdicao : handleConfirmCadastro}
      />
      <Modal
        visible={isModalVisible}
        title={
          isEditing ? 'Perfil atualizado' : 'Cadastro realizado com sucesso!'
        }
        description={
          isEditing
            ? 'Suas informações foram salvas com sucesso.'
            : 'Você será direcionado para a tela de login!'
        }
        confirmText="OK"
        confirmColor="#32C25B"
        onClose={handleModalClose}
      />
    </View>
  )};
