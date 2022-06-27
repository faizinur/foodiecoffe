import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({

    content: {
        width,
        height: height * .6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pendingImageContainer: {
        width: 160,
        height: 160,
        backgroundColor: colors.magnolia,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 32
    },
    textCenter: {
        textAlign: 'center',
    }
})