import React from 'react';
import { SafeAreaView, View} from 'react-native';
import { WebView } from 'react-native-webview'; 
import BackButton from '../../../components/BackButton';
import { getStyles } from './style';
import { useThemedStyles } from '../../../hooks/useThemedStyles';

type Props = {
  navigation: any;
};

const TermosPage = ({ navigation }: Props) => {
  const styles = useThemedStyles(getStyles);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} rightText='Termos e regulamentos' />
      </View>
      <WebView
        originWhitelist={['*']}
        source={{ uri: 'https://sobreuol.noticias.uol.com.br/normas-de-seguranca-e-privacidade/en/' }}
        style={styles.webview}
      />
    </SafeAreaView>
  );
};

export default TermosPage;