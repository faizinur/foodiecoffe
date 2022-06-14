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

    drawerIndicator: {
        height: 4,
        width: 30,
        alignSelf: 'center',
        backgroundColor: colors.athensGray,
        borderRadius: 100,
        marginBottom: 6
    },

    contentContainerStyle: {
        padding: 5,
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },

    sectionContainer: {
        paddingHorizontal: '5%'
    }
})