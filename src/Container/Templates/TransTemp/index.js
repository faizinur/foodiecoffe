import { View, FlatList } from 'react-native';
import React, { useEffect, memo, useCallback } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import { CardTransaksi, MyToolBar } from '@Organisms';
import { UseTransaksi } from '@ViewModel';
import styles from './styles';
export default memo(() => {
    const {
        errorTransaksi,
        loading,
        transactionList,
        memoizedTransactionList,
        activeTransationList,
        _getTransaksiList,
        _filterTransaksi,
        _onChangeTransactionList,
    } = UseTransaksi();

    const { colors } = useTheme();
    const _onPressCalendar = useCallback(() => log('_onPressCalendar Pressed'), [])
    const renderCardOrder = ({ item }) => <CardTransaksi item={item} onPress={() => { }} />
    useEffect(() => {
        log('Mount TransTemp');
        _getTransaksiList()
        return () => {
            log('Unmount TransTemp')
        }
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <MyText medium bold left black>Daftar Transaksi </MyText>
            </View>
            <MyToolBar
                data={[
                    {
                        label: `Berhasil`,
                        icon: 'check-bold',
                        type: 'success',
                        color: colors.emerald
                    },
                    {
                        label: `Gagal`,
                        icon: 'close-thick',
                        type: 'failed',
                        color: colors.wildWaterMelon
                    },
                ]}
                activeOrderList={activeTransationList}
                onPressChips={_onChangeTransactionList}
                onPressCalendar={_onPressCalendar}
                loading={loading}
                onChoosenCalendar={_filterTransaksi}
            />
            <View style={styles.content}>
                <FlatList
                    contentContainerStyle={styles.contentContainerStyle}
                    data={loading ? [] : memoizedTransactionList}
                    renderItem={renderCardOrder}
                    snapToInterval={150}
                    keyExtractor={({ id }) => id}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => <MyText light bold black>{JSON.stringify(errorTransaksi) !== '""' ? errorTransaksi : (memoizedTransactionList.length == 0 ? `Ups... sepertinya transaksi ini masih kosong` : 'Harap Tunggu...')}</MyText>}
                />
            </View>
        </View>
    )
})