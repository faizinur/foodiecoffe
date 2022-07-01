import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    pressableIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        flex: 1
    },
    modalContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: '5%',
    },
    imgBadge: {
        width: '100%',
        height: 200,
        borderRadius: 12
    },
    description: {
        width: '100%',
        paddingVertical: 24,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.lightgray
    },
    sectionStatus: {
        marginTop: 24,
        marginBottom: 15,
        width: '100%',
        height: 60,
        borderBottomWidth: .8,
        flexDirection: 'row',
        borderBottomColor: colors.lightgray,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionVariant: {
        marginBottom: 15,
        width: '100%',
        height: 50,
        borderBottomWidth: .8,
        flexDirection: 'row',
        borderBottomColor: colors.lightgray,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleVariant: {
        marginVertical: 22
    },
    buttonsContainer: {
        width: '100%',
        height: 80,
        backgroundColor: colors.white,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button: {
        flexGrow: 1,
        marginHorizontal: 10
    },
    contentContainerStyle: {
        padding: 5,
        paddingBottom: 120,
        paddingTop: 10
    },
    filterContainerStyle: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    imageWrapper: {
        width: '100%',
        height: 200
    }
})