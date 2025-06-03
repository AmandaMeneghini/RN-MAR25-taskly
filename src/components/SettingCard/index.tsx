import { TouchableOpacity, Text, Image } from "react-native";
import styles from "./style";

export default function ({ onPress }: { onPress?: () => void }) {
    return(
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={styles.text}>Habilitar tema claro</Text>
            <Image source={require('../../Assets/icons/VectorBack.png')} style={styles.icon}/>
        </TouchableOpacity>
    )
}