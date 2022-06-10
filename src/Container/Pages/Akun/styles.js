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
    akunContainer: {
        flex: 1
    },
    cardTansaksiWrapper: {
        width: '100%',
        height: 140,
        backgroundColor: colors.white
    },
    titleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 20,
        width: '100%',
        paddingHorizontal: '5%'
    },
    contentContainerStyle: {
        backgroundColor: colors.white,
        flex: 1,
    },
    container: {
        backgroundColor: colors.white,
        flex: 1,
        paddingHorizontal: "5%"
    },
    buttonContainer:
    {
        width: '100%',
        height: 80,
        paddingHorizontal: '5%',
        justifyContent: 'center',
    },
    avatarSection: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 200,
        alignSelf: 'center'
    },
    avatarProfile: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarImg: {
        borderRadius: 40,
        height: 80,
        width: 80
    },
    avatarIcon: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: colors.cerulean,
        borderWidth: 1,
        borderColor: colors.white,
        position: 'absolute',
        top: 13,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    decriptionText: {
        textAlign: 'center'
    },
    flatListTransaksi: {
        height: 130,
        padding: 10
    },
    flatListTraffic: {
        width: '100%',
    },
    listTrafficWrapper: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: colors.white,
        paddingHorizontal: '5%',
        marginBottom: 270,
    },
    trafficTitle: {
        marginBottom: 10
    },
})