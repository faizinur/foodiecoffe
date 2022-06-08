import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    container: {
        marginVertical: 12
    },
    titleStyle: {
        color: colors.black,
        textTransform: 'capitalize'
    },
    listStyle: {
        backgroundColor: colors.white,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    leftIcon: (backgroundColor) => ({
        height: 24,
        width: 24,
        backgroundColor,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    }),
    rightIcon: (backgroundColor, isExpanded) => ({
        width: 61,
        height: 32,
        backgroundColor,
        borderRadius: 8,
        padding: 5,
        flexDirection: 'row',
        justifyContent: !isExpanded ? 'flex-end' : 'center',
        alignItems: 'center',
    })
})