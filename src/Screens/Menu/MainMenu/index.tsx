import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {CarouselActionList} from '../../../components/carouselActionList/index';
import Modal from '../../AvatarSelector/Modal';
import styles from './style';
import {API_BASE_URL} from '../../../env';

import {
  getToken,
  removeToken,
  refreshAuthToken,
} from '../../../Utils/authUtils';

const S3_AVATAR_BASE_URL = 'https://taskly-media.s3.us-east-1.amazonaws.com/';

type Props = {
  navigation: any;
  route: any;
};

const MenuPrincipal = ({navigation, route}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    avatarId: '',
  });

  const fetchUserProfile = useCallback(async () => {
    try {
      const token = await getToken();

      if (!token) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData({
          name: data.name || 'Usuário',
          email: data.email || 'Email não disponível',
          phone: data.phone_number || 'Telefone não disponível',
          avatarId: data.picture || '',
        });
      } else if (response.status === 401) {
        try {
          const newToken = await refreshAuthToken();
          const retryResponse = await fetch(`${API_BASE_URL}/profile`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });

          if (retryResponse.ok) {
            const data = await retryResponse.json();
            setUserData({
              name: data.name || 'Usuário',
              email: data.email || 'Email não disponível',
              phone: data.phone_number || 'Telefone não disponível',
              avatarId: data.picture || '',
            });
          } else {
            throw new Error('Erro ao buscar perfil com novo token.');
          }
        } catch (refreshError) {
          console.error('Erro ao renovar o token:', refreshError);
          Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
          await removeToken();
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        }
      } else {
        console.error('Erro ao buscar perfil:', response.status);
        Alert.alert(
          'Erro',
          'Não foi possível carregar as informações do perfil.',
        );
      }
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');

      await removeToken();
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  }, [navigation]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  useEffect(() => {
    if (route.params?.showConfirmationModal && !hasShownModal) {
      setIsModalVisible(true);
      setHasShownModal(true);
    }
  }, [route.params, hasShownModal]);

  const avatarSourceUri = userData.avatarId
    ? `${S3_AVATAR_BASE_URL}${userData.avatarId}.png`
    : `${S3_AVATAR_BASE_URL}avatar_1.png`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: avatarSourceUri }}
          style={styles.avatar}
        />
        <View style={styles.containerInfo}>
          <Text style={[styles.profileText, styles.profileNome]}>
            {userData.name}
          </Text>
          <Text style={styles.profileText}>{userData.email}</Text>
          <Text style={styles.profileText}>{userData.phone}</Text>
        </View>
      </View>

      <View style={styles.carouselContainer}>
        <CarouselActionList />
      </View>

      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PreferencesMenu')}>
          <Text style={styles.buttonText}>Preferências</Text>
          <Image
            source={require('../../../Assets/icons/VectorBack.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Regulamentos')}>
          <Text style={styles.buttonText}>Termos e regulamentos</Text>
          <Image
            source={require('../../../Assets/icons/VectorBack.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        title="Perfil atualizado"
        description="Suas informações foram salvas com sucesso."
        confirmText="FECHAR"
        confirmColor="#4CAF50"
        onClose={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default MenuPrincipal;