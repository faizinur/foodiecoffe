import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    trafficWrapper: {
        width: '100%',
        paddingHorizontal: 5,
    },
    trafficContainer: {
        height: 102,
        width: '100%',
        borderRadius: 12,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    revenue: {
        flex: 1,
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 16,
    },
    graph: {
        flex: 1,
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    divider: {
        height: 12
    }
})