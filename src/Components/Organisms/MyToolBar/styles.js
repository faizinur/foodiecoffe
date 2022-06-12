import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    sectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    chipsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chip: (backgroundColor) => ({
        height: 30,
        marginHorizontal: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: .5,
        backgroundColor,
    }),
    chipText: {
        fontSize: 12,
        fontFamily: 'ReadexProMedium',
    },
    chipCalendar: {
        height: 30,
        marginHorizontal: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderWidth: .5,
    },
    chipCalendarText: {
        fontSize: 12,
        fontFamily: 'ReadexProLight',
    },
});