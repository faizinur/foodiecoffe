import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    pressableIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        flex: 1
    },
    modalContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: '5%',
    },
    description: {
        width: '100%',
        paddingVertical: 24,
        justifyContent: 'center',
    }
})