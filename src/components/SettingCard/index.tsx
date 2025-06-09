import { TouchableOpacity, Text, Image } from "react-native";
import { getStyles } from './style'; // 1. Importe a FUNÇÃO getStyles
import { useThemedStyles } from '../../hooks/useThemedStyles'; // 2. Importe nosso hook mágico

export default function ({ onPress }: { onPress?: () => void }) {
    const styles = useThemedStyles(getStyles);
    return(
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={styles.text}>Habilitar tema claro</Text>
            <Image source={require('../../Assets/icons/VectorBack.png')} style={styles.icon}/>
        </TouchableOpacity>
    )
}