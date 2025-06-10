import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { getStyles } from './style'; // Importa a FUNÇÃO de estilos
import { useTheme } from '../../context/ThemeContext'; // Importa o hook do tema
interface BackButtonProps {
  onPress: () => void;
  rightText?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress, rightText }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../Assets/icons/VectorBack.png')}
            style={[styles.icon, { tintColor: theme.background }]} // Aplica a cor do tema ao ícone
          />
          <Text style={styles.textButton}>VOLTAR</Text>
        </View>
      </TouchableOpacity>

      {rightText && <Text style={styles.textRight}>{rightText}</Text>}
    </View>
  );
};

export default BackButton;
