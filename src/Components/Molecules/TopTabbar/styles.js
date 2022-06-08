import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    sliderContainer: {
        paddingHorizontal: '5%',
        paddingVertical: 16,
        height: 100,
    },
    sliderWrapper: {
        width: '100%',
        height: 54,
        backgroundColor: colors.magnolia,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    slider: {
        position: 'absolute',
        top: 7.5,
        left: 7.5,
        backgroundColor: colors.white,
        width: '49%',
        height: 39,
        borderRadius: 12,
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
    tabItem: {
        width: '49%',
        height: 39,
        borderRadius: 12,
        justifyContent: 'center',
        salignItems: 'center'
    },
})