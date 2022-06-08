import { View, TouchableOpacity, BackHandler, Alert } from 'react-native';
import React, { memo } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default memo(({ reset }) => {
    const { colors } = useTheme();
    const _onLogOut = () => {
        log('_onLogOut : ');
        Alert.alert(
            'Foodie Coffe',
            'Mau keluar nih?',
            [{
                text: "Batal", onPress: () => log("Cancel Pressed"), style: "cancel"
            },
            {
                text: "Mau aja", onPress: () => BackHandler.exitApp()//reset('Login')
            }]
        )
    }
    return (
        <TouchableOpacity
            activeOpacity={.8}
            onPress={_onLogOut}
            style={{ width: '100%', height: 80, backgroundColor: colors.white, paddingHorizontal: '5%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Icon name='location-exit' size={30} color={colors.cerulean} style={{ marginRight: 15 }} />
            <View style={{ flex: 1 }}>
                <MyText medium bold left color={colors.black}>Keluar</MyText>
                <MyText light left >Anda tidak akan dapat menggunakan layanan Foody, kecuali Anda login kembali</MyText>
            </View>
        </TouchableOpacity>
    )
})
