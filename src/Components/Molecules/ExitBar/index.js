import { View, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UseAuth } from '@ViewModel';
export default memo(() => {
    const { _logOut } = UseAuth();
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            activeOpacity={.8}
            onPress={_logOut}
            style={styles.exitBarContainer}>
            <Icon name='location-exit' size={30} color={colors.cerulean} style={styles.iconExit} />
            <View style={styles.container}>
                <MyText medium bold left black>Keluar</MyText>
                <MyText light left >Anda tidak akan dapat menggunakan layanan Foody, kecuali Anda login kembali</MyText>
            </View>
        </TouchableOpacity>
    )
})
