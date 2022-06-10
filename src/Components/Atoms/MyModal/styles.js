import { StyleSheet, Dimensions, StatusBar } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    }
})