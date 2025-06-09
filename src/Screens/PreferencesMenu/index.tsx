import React, { useState } from "react";
import { View } from "react-native";
import {useNavigation} from '@react-navigation/native';
import BackButton from '../../components/BackButton';
import SettingCard from "../../components/SettingCard";
import ThemeModal from "./Modal";
import styles from "./style";
import { useTheme } from '../../context/ThemeContext';

export default function PreferencesMenu() {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false)
    return(
        <>
            <View style={styles.header}>
                <BackButton
                onPress={() => navigation.goBack()}
                rightText="Preferências"
                />
            </View>
        <View  style={[styles.container, { backgroundColor: theme.background }]}>
            <SettingCard onPress={() => setModalVisible(true)} />
            <ThemeModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>
        </>
    )
}
