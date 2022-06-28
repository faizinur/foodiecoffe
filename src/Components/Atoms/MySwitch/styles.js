import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    track: {
        width: 45,
        height: 24,
        backgroundColor: colors.cerulean,
        borderRadius: 12,
        padding: 3,
        justifyContent: 'center'
    },
    thumb: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: colors.white
    },

})