import {useState} from 'react';
import {FlatList, View, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import * as Keychain from 'react-native-keychain';
import type {RootStackParamList} from '../../Navigation/types';
import { API_BASE_URL } from '../../env';
import {CarouselActionItem} from '../carouselActionItem';
import userIcon from '../../Assets/icons/User.png';
import biometryIcon from '../../Assets/icons/FingerprintSimple.png';
import deleteIcon from '../../Assets/icons/Trash.png';
import logoutIcon from '../../Assets/icons/SignOut.png';
import ConfirmationModal from '../ConfirmationModal';
import {
  removeToken,
  setBiometryEnabled,
  isBiometryEnabled,
} from '../../Utils/authUtils';
import styles from './style';

const actions = [
  {id: '1', title: 'Editar Informações Pessoais', icon: userIcon},
  {id: '2', title: 'Mudar Biometria', icon: biometryIcon},
  {id: '3', title: 'Sair da Conta', icon: logoutIcon},
  {id: '4', title: 'Excluir Conta', icon: deleteIcon},
];

const modalConfigs = {
  'Sair da Conta': {
    title: 'Deseja sair?',
    description:
      'Tem certeza que deseja sair do aplicativo? Você poderá se conectar novamente a qualquer momento.',
    confirmText: 'SAIR',
    confirmColor: '#E23C44',
  },
  'Excluir Conta': {
    title: 'Excluir conta',
    description:
      'Tem certeza que deseja excluir sua conta? Essa ação é permanente e todos os seus dados serão perdidos.',
    confirmText: 'EXCLUIR',
    confirmColor: '#E23C44',
  },
  'Mudar Biometria': {
    title: 'Ativar biometria',
    description:
      'Deseja ativar a autenticação por biometria? Isso permitirá um acesso mais rápido e seguro ao app.',
    confirmText: 'HABILITAR',
    confirmColor: '#32C25B',
  },
  'Desativar Biometria': {
    title: 'Desativar biometria',
    description:
      'Tem certeza que deseja desativar o login por biometria? Você voltará a usar e‑mail e senha.',
    confirmText: 'DESATIVAR',
    confirmColor: '#E23C44',
  },
};

export function CarouselActionList() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentModal, setCurrentModal] = useState<
    null | keyof typeof modalConfigs
  >(null);

  const handleAction = async (title: string) => {
    if (title === 'Editar Informações Pessoais') {
      navigation.navigate('EditPersonalInfo');
      return;
    }

    if (title === 'Mudar Biometria') {
      try {
        const biometryEnabled = await isBiometryEnabled();

        if (biometryEnabled) {
          setCurrentModal('Desativar Biometria');
        } else {
          setCurrentModal('Mudar Biometria');
        }
      } catch (error) {
        console.error('Erro ao verificar biometria:', error);
        Alert.alert(
          'Erro',
          'Não foi possível verificar o status da biometria.',
        );
      }
      setModalVisible(true);
      return;
    }

    if (modalConfigs[title as keyof typeof modalConfigs]) {
      setCurrentModal(title as keyof typeof modalConfigs);
      setModalVisible(true);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setCurrentModal(null);
  };

  const handleConfirm = async () => {
    try {
      if (currentModal === 'Mudar Biometria') {
        await Keychain.setGenericPassword('user', 'dummy_password', {
          accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
        });
        await setBiometryEnabled(true);
        console.log('Biometria ativada.');
      } else if (currentModal === 'Desativar Biometria') {
        await removeToken();
        await setBiometryEnabled(false);
        console.log('Biometria desativada.');
      } else if (currentModal === 'Sair da Conta') {
        await removeToken();
        console.log('Token removido. Usuário deslogado.');
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      } else if (currentModal === 'Excluir Conta') {
        console.log('Iniciando exclusão de conta...');
        const token = await Keychain.getGenericPassword();

        if (!token || !token.password) {
          throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch(`${API_BASE_URL}/profile/delete-account`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token.password}`,
          },
        });

        if (response.ok) {
          console.log('Conta excluída com sucesso.');
          await removeToken();
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        } else {
          console.error('Erro ao excluir conta:', response.status);
          Alert.alert(
            'Erro',
            'Não foi possível excluir sua conta. Tente novamente mais tarde.',
          );
        }
      }
    } catch (error) {
      console.error(`Erro ao executar ação: ${currentModal}`, error);
      Alert.alert('Erro', 'Não foi possível completar a ação.');
    } finally {
      setModalVisible(false);
      setCurrentModal(null);
    }
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={actions}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 12}}
        renderItem={({item}) => (
          <CarouselActionItem
            title={item.title}
            icon={item.icon}
            onPress={() => handleAction(item.title)}
          />
        )}
      />
      {currentModal && (
        <ConfirmationModal
          visible={modalVisible}
          title={modalConfigs[currentModal].title}
          description={modalConfigs[currentModal].description}
          confirmText={modalConfigs[currentModal].confirmText}
          confirmColor={modalConfigs[currentModal].confirmColor}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
    </View>
  );
}
