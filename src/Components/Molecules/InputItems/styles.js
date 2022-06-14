import { StyleSheet, Dimensions, StatusBar } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    rightIconContainer: {
        position: 'absolute',
        top: 28,
        right: 35,
        zIndex: 999999
    },
    dropDownRightIconContainer: {
        height: 60,
        width: '100%',
        position: 'absolute',
        top: 10,
        left: 0,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftIconContainer: {
        position: 'absolute',
        top: 24,
        left: 15,
        zIndex: 999999,
        flexDirection: 'row'
    },
    prefixNumber: {
        marginVertical: 5
    },
    prefixDivider: {
        width: 1.3,
        height: 24,
        marginTop: 3,
        marginLeft: 16,
        backgroundColor: colors.lightgray
    },
    textInput: (paddingLeft) => ({
        backgroundColor: colors.white,
        marginVertical: 5,
        fontSize: 14,
        paddingLeft
    }),
    button: borderWidth => ({
        marginVertical: 5,
        borderWidth,
        borderColor: colors.cerulean
    }),
    buttonContent: backgroundColor => ({
        height: 52,
        backgroundColor
    }),
    buttonLabel: color => ({
        color,
        fontWeight: '700',
        textTransform: 'capitalize'
    }),
    hiddenInputPatch: {
        height: 5,
        width: 5,
        position: 'absolute',
        top: -1,
        left: 0,
        backgroundColor: colors.white
    },
    switchWrapper: {
        marginVertical: 12
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    switchInnerContainer: {
        flexDirection: 'row',
        flex: 1
    },
    titleBarinput: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: colors.athensGray,
        fontSize: 14,
        fontFamily: 'ReadexProLight',
        paddingLeft: 15
    }
})