import React from 'react';
import { TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStyles } from './style';
import { useThemedStyles } from '../../hooks/useThemedStyles';

interface SmallBackButtonProps {
    onPress?: () => void;
}

const SmallBackButton: React.FC<SmallBackButtonProps> = ({ onPress }) => {
    const navigation = useNavigation();
    const styles = useThemedStyles(getStyles);

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Image style={styles.icon} source={require('../../Assets/icons/VectorBack.png')} />
        </TouchableOpacity>
    );
};

export default SmallBackButton;