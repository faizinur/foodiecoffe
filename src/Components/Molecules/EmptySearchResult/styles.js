import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 35,
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        marginTop: 25
    },
    subTitle: {
        textAlign: 'center',
        marginTop: 8
    },
})