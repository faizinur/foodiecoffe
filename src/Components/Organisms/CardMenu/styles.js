import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: 120,
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightgray
    },
    imgProduct: {
        alignSelf: 'center',
        marginRight: 16,
    },
    imgDescription: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'center',
    }
})