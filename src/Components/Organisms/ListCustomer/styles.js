import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
    },
    img: {
        marginRight: 16
    },
    table: {
        backgroundColor: colors.cerulean,
        minWidth: 60,
        paddingHorizontal: 10,
        height: 26,
        borderRadius: 6,
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    flexContainer: {
        flex: 1
    },
    flexRow: {
        flexDirection: 'row'
    },
    flexCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})