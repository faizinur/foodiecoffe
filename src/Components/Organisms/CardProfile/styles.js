import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
export { height, width };
import { THEME } from '@Utils';
const { colors } = THEME;
export default StyleSheet.create({
    cardProfileWrapper: {
        width: '100%',
        height: 103,
        backgroundColor: colors.wildWatermelon,
        paddingHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        alignSelf: 'flex-start'
    },
    avatar: {
        borderRadius: 30,
        height: 60,
        width: 60,
        marginRight: 12
    },
    descriptionContainer: {
        flex: 1,
        height: '100%'
    },
    role: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textRole: {
        minWidth: 30
    },
    roleName: {
        height: 26,
        minWidth: 50,
        paddingHorizontal: 8,
        backgroundColor: colors.cerulean,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6
    },
    buttonEdit: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        alignSelf: 'flex-start'
    },
    icPencil: {
        marginHorizontal: 5
    }
})