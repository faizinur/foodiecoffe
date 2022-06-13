import { StyleSheet, Dimensions, StatusBar } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    contentContainerStyle: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
    },
})