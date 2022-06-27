import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    cardWrapper: (numColumns) => ({
        width: width / numColumns,
        height: 140,
        justifyContent: 'center',
        alignItems: 'center'
    }),
    cardContainer: {
        height: 120,
        width: 100,
        backgroundColor: colors.cerulean,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    cardImage: {
        height: 100,
        width: 100,
        borderRadius: 10,
        marginVertical: 4
    }
})