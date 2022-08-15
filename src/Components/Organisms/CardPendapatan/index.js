import { View, TouchableOpacity, Image } from 'react-native';
import React, { memo, useCallback } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import { IC_ICON_TRANSAKSI } from '@Atoms/Icons'
import styles from './styles';
export default memo(props => {
    const { colors } = useTheme();
    const _onCardTransactionPress = useCallback(() => {
        log('_onCardTransactionPress  : ')
    }, [])
    return (
        <TouchableOpacity
            activeOpacity={.9}
            onPress={_onCardTransactionPress}
            style={styles.cardPendapatanContainer}>
            <Image source={IC_ICON_TRANSAKSI} />
            <View style={styles.cashWrapper}>
                <MyText left medium bold numberOfLines={1} black>{props.paymentMethod}</MyText>
                <MyText left >Rp{props.paymentAmount}</MyText>
            </View>
        </TouchableOpacity>
    )
})
