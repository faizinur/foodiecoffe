import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    listContainer: {
        width: '100%',
        minHeight: 92,
        flexDirection: 'row'
    },
    img: {
        alignSelf: 'center',
        marginRight: 16,
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    productDetail: {
        flex: 1,
        justifyContent: 'space-evenly'
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    orderState: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#cbf5e6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notes: {
        width: '100%',
        marginBottom: 5,
    },
    orderTable: {
        width: 31,
        height: 24,
        borderRadius: 6,
        backgroundColor: colors.magnolia,
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        width: '90%',
        height: 1,
        backgroundColor: colors.magnolia,
        alignSelf: 'center',
        marginVertical: 4
    }
})