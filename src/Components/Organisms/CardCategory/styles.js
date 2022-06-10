import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    cardWrapper: (numColumns) => ({
        width: width / numColumns,
        justifyContent: 'center',
        alignItems: 'center',
    })
})