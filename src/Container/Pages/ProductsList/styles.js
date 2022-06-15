import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        flexGrow: 1,
        marginHorizontal: 10,
        width: width * .45,
    },
    contentContainerStyle: {
        padding: '5%',
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    filterContainerStyle: {
        flex: 1,
        justifyContent: 'flex-end'
    },
})