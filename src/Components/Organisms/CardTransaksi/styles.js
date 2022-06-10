import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({

    cardTransaksiContainer: {
        height: 72,
        width: 178,
        borderRadius: 12,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        padding: 16,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    cashWrapper: {
        marginHorizontal: 12
    },
    iconRevenue: {
        marginHorizontal: 5
    },
})