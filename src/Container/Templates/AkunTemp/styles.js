import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    pages: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.white,
        paddingBottom: 80,
    },
})