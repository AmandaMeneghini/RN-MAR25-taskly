import React, { useEffect, useCallback} from 'react';
import {View, KeyboardAvoidingView, ScrollView, Alert, Platform} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Input from '../../components/input';
import Button from '../../components/button';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../Navigation/types';
import ProfileHeader from '../../components/ProfileHeader';
import ProgressBar from '../../components/ProgressBar';
import { getStyles } from './style';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { getProfile } from '../../services/profileService';
import { capitalizeName, formatPhoneNumberForInput, cleanPhoneNumber } from '../../Utils/textFormatters';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditPersonalInfo'
>;

function EditPersonalInfoScreen() {
  const navigation = useNavigation<NavigationProp>();
  const styles = useThemedStyles(getStyles);

  const { control, handleSubmit, setValue, reset, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    },
  });

  const fetchUserProfile = useCallback(async () => {
    try {
      const data = await getProfile();
      reset({
        email: data.email,
        name: data.name || '',
        phone: formatPhoneNumberForInput(data.phone_number || ''),
      });

    } catch (error: any) {
      console.log('[EditProfile] Erro em fetchUserProfile:', error);
      Alert.alert(
        'Erro',
        'Não foi possível carregar as informações do perfil. Faça login novamente.',
      );
      navigation.reset({ index: 0, routes: [{name: 'Login'}] });
    }
  }, [navigation, reset]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const onSubmit = (data: { name: string, phone: string }) => {
    const formattedName = capitalizeName(data.name);
    const cleanedPhone = cleanPhoneNumber(data.phone);

    navigation.navigate('AvatarSelector', {
      name: formattedName,
      phone_number: cleanedPhone,
      isEditing: true,
    });
  };

  return (
    
    <KeyboardAvoidingView 
        style={{flex: 1}} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <ProfileHeader
            title="EDIÇÃO DE PERFIL"
            onBackPress={() => navigation.goBack()}
          />
          <ProgressBar progress={0.5} />

          <Controller
            control={control}
            name="name"
            rules={{
              required: 'Campo obrigatório',
              validate: value => {
                const parts = value.trim().split(' ').filter(Boolean);
                return (parts.length >= 2 && parts[parts.length - 1].length >= 2) || 'Digite o nome completo';
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
                  placeholder="Digite seu nome"
                  containerStyle={styles.inputSpacing}
                />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value } }) => (
                <Input
                  label="E-mail"
                  value={value}
                  placeholder="Digite seu e-mail"
                  keyboardType="email-address"
                  containerStyle={styles.inputSpacing}
                  editable={false}
                />
            )}
          />

          <Controller
            control={control}
            name="phone"
            rules={{
                required: 'Campo obrigatório',
                validate: value => cleanPhoneNumber(value).length === 11 || 'Número inválido. Deve conter 11 dígitos.',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Número"
                  value={value}
                  onChangeText={(text) => onChange(formatPhoneNumberForInput(text))}
                  onBlur={onBlur}
                  error={errors.phone?.message}
                  keyboardType="numeric"
                  maxLength={17}
                  containerStyle={styles.inputSpacing}
                />
            )}
          />

          <Button
            title="CONTINUAR"
            onPress={handleSubmit(onSubmit)}
            width="100%"
            fontFamily="Roboto60020"
            style={styles.buttonSpacing}
            disabled={!isValid}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default EditPersonalInfoScreen;
