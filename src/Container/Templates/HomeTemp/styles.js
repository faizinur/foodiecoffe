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

    contentModalContainerStyle: {
        padding: 5,
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    FAB: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'absolute',
        height: 58,
        width: 58,
        borderRadius: 30,
        backgroundColor: colors.cerulean,
        top: 84,
        right: 24,
        justifyContent: 'center',
        alignItems: 'center'
    }
})