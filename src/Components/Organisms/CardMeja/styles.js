import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    cardWrapper: (width) => ({
        width,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 4
    }),
    container: backgroundColor => ({
        height: 121,
        width: 156,
        backgroundColor,
        borderWidth: 1,
        borderColor: colors.lightgray,
        borderRadius: 12,
        padding: 12,
    }),
    qrWrapper: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    qr: {
        width: 44,
        height: 44,
        backgroundColor: colors.magnolia,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.7,
        borderColor: colors.lightgray,
    },
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }
})