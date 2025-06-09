import { StyleSheet } from "react-native";
import Fonts from "../../Theme/fonts";


const styles = StyleSheet.create({
    container: {
        padding: 32,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textPreferences: {
        ...Fonts.Roboto40016
    }
})

export default styles
