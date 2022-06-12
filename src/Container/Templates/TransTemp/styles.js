import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.white,
        padding: '5%',
    },
    titleContainer: {
        height: 30,
        width: '100%',
    },
    sectionTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btnSection: {
        width: 125,
        height: 36,
        borderWidth: 1,
        borderColor: colors.athensGray,
        borderRadius: 100,
        paddingHorizontal: 15,
        marginVertical: 5
    },
    content: {
        flex: 1
    },
    contentContainerStyle: {
        padding: 5,
        paddingBottom: 120,
        paddingTop: 10
    },
})