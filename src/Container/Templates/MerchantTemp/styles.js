import { StyleSheet, Dimensions, StatusBar } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
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