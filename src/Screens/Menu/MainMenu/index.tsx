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

import {
  removeToken,
  refreshAuthToken,
} from '../../../Utils/authUtils';

import { getS3AvatarUrl } from '../../../Utils/imageUtils';
import { formatPhoneNumberForDisplay } from '../../../Utils/textFormatters';
import { useFocusEffect } from '@react-navigation/native';
import { getProfile } from '../../../services/profileService';

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
      const data = await getProfile();
      setUserData({
        name: data.name || 'Usuário',
        email: data.email || 'Email não disponível',
        phone: formatPhoneNumberForDisplay(data.phone_number || ''),
        avatarId: data.picture || '',
      });
    } catch (error: any) {
      console.log('[MainMenu] Erro ao buscar perfil:', error.message);

      if (error.response?.status === 401) {
        console.log('[MainMenu] Token pode ter expirado (401). Tentando renovar...');
        try {

          await refreshAuthToken();

          const newData = await getProfile();
          setUserData({
            name: newData.name || 'Usuário',
            email: newData.email || 'Email não disponível',
            phone: formatPhoneNumberForDisplay(newData.phone_number || ''),
            avatarId: newData.picture || '',
          });
        } catch (refreshError) {
          console.error('[MainMenu] Falha ao renovar o token. Deslogando.', refreshError);
          Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
          await removeToken();
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        }
      } else {
        Alert.alert(
          'Erro',
          'Não foi possível carregar as informações do perfil.',
        );
      }
    }
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      console.log("[MainMenu] Tela focada. Buscando perfil do usuário...");
      fetchUserProfile();
    }, [fetchUserProfile])
  );

  useEffect(() => {
    if (route.params?.showConfirmationModal && !hasShownModal) {
      setIsModalVisible(true);
      setHasShownModal(true);
    }
  }, [route.params, hasShownModal]);

  const avatarSourceUri = getS3AvatarUrl(userData.avatarId, 'avatar_5');

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
