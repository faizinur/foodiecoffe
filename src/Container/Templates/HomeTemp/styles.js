import { StyleSheet, Dimensions, StatusBar } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    contentContainerStyle: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        paddingTop: 7,
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.white
    },
    fab: {
        colors: {
            accent: colors.cerulean
        }
    },
    fabStyles: {
        position: 'absolute',
        right: 24,
        bottom: 90,
    },
    pagerContainer: {
        flex: 1
    },
    pagerInnerContainer: {
        paddingHorizontal: '5%'
    },
    sectionTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btnSection: {
        width: 125,
        height: 36,
        borderWidth: 1,
        borderColor: colors.athensGray,
        borderRadius: 100,
        paddingHorizontal: 15,
        marginVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    drawerIndicator: {
        height: 4,
        width: 30,
        alignSelf: 'center',
        backgroundColor: colors.athensGray,
        borderRadius: 100,
        marginBottom: 6
    },
    sectionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10
    },
    contentContainerStyle: {
        padding: 5,
        paddingBottom: 120,
        paddingTop: 10
    },
    chipsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chip: {
        height: 30,
        marginHorizontal: 2.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chipText: {
        fontSize: 12,
        fontFamily: 'ReadexProMedium'
    }
})