import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: (paddingHorizontal = '5%') => ({
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal,
        alignContent: 'center',
    })
})