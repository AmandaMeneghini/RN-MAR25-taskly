import { StyleSheet } from "react-native";
import Fonts from "../../Theme/fonts";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 30,
    },
    textPreferences: {
        ...Fonts.Roboto40016
    }
})

export default styles
