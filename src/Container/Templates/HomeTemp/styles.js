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
        marginVertical: 5
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
        // height: 60,
        width: '100%',
        paddingHorizontal: '5%',
        marginVertical: 24,
    },
})