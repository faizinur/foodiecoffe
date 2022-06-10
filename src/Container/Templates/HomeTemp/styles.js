import { StyleSheet, Dimensions, StatusBar } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
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
    modal: {
        flex: 1,
    },
    drawwerIndicator: {
        height: 4,
        width: 30,
        alignSelf: 'center',
        backgroundColor: colors.cerulean,
        borderRadius: 100
    },
    sectionContainer: {
        // height: 60,
        width: '100%',
        paddingHorizontal: '5%',
        marginVertical: 24,
    },
})