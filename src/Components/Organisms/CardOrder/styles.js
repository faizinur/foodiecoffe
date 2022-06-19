import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    cardContainer: {
        width: '99%',
        alignSelf: 'center',
        height: 150,
        marginVertical: 8,
        borderRadius: 16,
        padding: 16,
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    userInfo: {
        width: '100%',
        height: 40,
        flexDirection: 'row'
    },
    userInfoWrapper: {
        flex: 1,
        paddingLeft: 12
    },
    userInfoDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    userTextlength: {
        width: '75%'
    },
    listOrder: {
        height: 50,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    orderCount: {
        height: 24,
        width: 31,
        backgroundColor: colors.magnolia,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dashedLine: {
        height: 2,
        borderWidth: 1,
        borderColor: colors.athensGray,
        borderStyle: 'dashed'
    },
    listPayment: {
        height: 40,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    tableNumber: (backgroundColor) => ({
        minWidth: 80,
        paddingHorizontal: 5,
        height: 21,
        borderRadius: 6,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
    }),
})