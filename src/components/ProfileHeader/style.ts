import { StyleSheet } from "react-native";
import Fonts from "../../Theme/fonts";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 13,
        backgroundColor: '#AAAAAA',
        height: 50,
        width: 110,
        borderRadius: 10,
      },
      backText: {
        color: '#fff',
        ...Fonts.Roboto50018,
      },
      editText: {
        ...Fonts.Roboto40016,
      }
})

export default styles