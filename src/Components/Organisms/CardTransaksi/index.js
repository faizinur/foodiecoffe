import { View, TouchableOpacity, Image } from 'react-native';
import React, { memo, useCallback } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import { IC_ICON_TRANSAKSI } from '@Atoms/Icons'
import styles from './styles';
export default memo(props => {
    const { colors } = useTheme();
    const _onDetailTransactionClick = useCallback(() => {
        log('_onDetailTransactionClick  : ')
    }, [])
    return (
        <View style={{ width: '100%', height: 132, backgroundColor: colors.white }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 55, width: '100%', paddingHorizontal: '5%' }}>
                <MyText bold color={colors.black}>Transaksi</MyText>
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={_onDetailTransactionClick}>
                    <MyText color={colors.cerulean}>Lihat semua</MyText>
                </TouchableOpacity>
            </View>
            <View style={{
                height: 72,
                width: 178,
                borderRadius: 12,
                backgroundColor: colors.white,
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexDirection: 'row',
                padding: 16,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,
            }}>
                <Image source={IC_ICON_TRANSAKSI} />
                <View style={{ marginHorizontal: 12 }}>
                    <MyText left medium bold color={colors.black}>Cash</MyText>
                    <MyText left >Rp 12.000.000</MyText>
                </View>
            </View>
        </View>
    )
})
