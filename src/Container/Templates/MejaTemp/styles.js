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
    },
    sectionContainer: {
        height: 60,
        width: '100%',
        padding: '5%',
    },
    content: {
        marginTop: 12,
        flex: 1,
        padding: '5%',
    },
})