import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    exitBarContainer: {
        width: '100%',
        height: 80,
        backgroundColor: colors.white,
        paddingHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconExit: {
        marginRight: 15
    },
    container: {
        flex: 1
    }
})