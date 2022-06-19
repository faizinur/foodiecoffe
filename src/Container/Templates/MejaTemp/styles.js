import { StyleSheet, Dimensions, StatusBar } from 'react-native';
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
        paddingHorizontal: '5%',
    },
    renderTitleWrappwe: (display) => ({
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        display
    }),
    pressableIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatList: {
        flex: 1,
        width: '100%',
        marginBottom: 60
    },
    flatListContent: {
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    separator: {
        height: 60
    },
    contentContainerStyle: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
    },
    drawerIndicator: {
        height: 4,
        width: 30,
        marginVertical: 6,
        alignSelf: 'center',
        backgroundColor: colors.athensGray,
        borderRadius: 100,
    },
    rnCamera: {
        flex: 1,
    },
    badgeMeja: {
        width: 98,
        height: 44,
        backgroundColor: colors.athensGray,
        borderRadius: 100,
        paddingHorizontal: 15,
        alignSelf: 'center',
        marginVertical: 32,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    badgeIcon: {
        backgroundColor: colors.white,
        height: 32,
        width: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrWrapper: {
        width: 230,
        height: 230,
        alignSelf: 'center',
        position: 'absolute',
        top: parseInt((height / 3) - 115)
    },
    qrMarker: {
        width: 181,
        height: 181,
        borderWidth: 2,
        borderColor: colors.white,
        position: 'absolute',
        top: 29,
        left: 29,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrMarkerTopRight: {
        width: 21,
        height: 21,
        position: 'absolute',
        top: 0,
        right: 0,
        borderTopWidth: 5,
        borderRightWidth: 5,
        borderColor: colors.cerulean,
        borderTopRightRadius: 7
    },
    qrMarkerTopLeft: {
        width: 21,
        height: 21,
        position: 'absolute',
        top: 0,
        left: 0,
        borderTopWidth: 5,
        borderLeftWidth: 5,
        borderColor: colors.cerulean,
        borderTopLeftRadius: 7
    },
    qrMarkerBottomRight: {
        width: 21,
        height: 21,
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderBottomWidth: 5,
        borderRightWidth: 5,
        borderColor: colors.cerulean,
        borderBottomRightRadius: 7
    },
    qrMarkerBottomLeft: {
        width: 21,
        height: 21,
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderBottomWidth: 5,
        borderLeftWidth: 5,
        borderColor: colors.cerulean,
        borderBottomLeftRadius: 7
    },
    cardSummary: {
        position: 'absolute',
        bottom: 90,
        width: '90%',
        marginHorizontal: '5%',
        backgroundColor: colors.white,
        padding: 17,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.athensGray,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },

    sectionList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8
    },
    dashed: {
        height: 2,
        backgroundColor: colors.athensGray
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 80,
        paddingHorizontal: '5%',
        justifyContent: 'center',
    },
})