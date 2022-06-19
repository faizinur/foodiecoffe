import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
    },
    img: {
        marginVertical: 16,
        marginRight: 16
    },
    customerInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameWidth: {
        width: '80%'
    },
    tableContainer: {
        width: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16
    },
    table: {
        backgroundColor: colors.cerulean,
        minWidth: 60,
        paddingHorizontal: 10,
        height: 26,
        borderRadius: 6,
        justifyContent: 'center',
        alignSelf: 'flex-end'
    }
})