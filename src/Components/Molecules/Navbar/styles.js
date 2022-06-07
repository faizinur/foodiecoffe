import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    navbarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 66,
        width: '100%',
        backgroundColor: colors.white,
        flexDirection: 'row',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    navItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: 20,
        width: 20
    },
    title: (fontWeight) => ({
        fontWeight
    })
})