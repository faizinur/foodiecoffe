import { View, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default memo(props => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            activeOpacity={.8}
            onPress={props?.onPress}
            style={{ width: '100%', height: 80, backgroundColor: colors.white, paddingHorizontal: '5%', flexDirection: 'row' }}>
            <Icon name='location-exit' size={30} color={colors.cerulean} style={{ marginRight: 15 }} />
            <View style={{ flex: 1 }}>
                <MyText medium bold left color={colors.black}>Keluar</MyText>
                <MyText light left >Anda tidak akan dapat menggunakan layanan Foody, kecuali Anda login kembali</MyText>
            </View>
        </TouchableOpacity>
    )
})
