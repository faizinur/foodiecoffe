import { View, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, memo, useCallback } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import { CardOrder, MyToolBar } from '@Organisms';
import { UseTransaksi } from '@ViewModel';
import { UsePolling } from '@CustomHooks';
import styles from './styles';
export default memo(({ navigation: { navigate } }) => {
    const {
        errorTransaksi,
        loading,
        transactionLoading,
        setTransactionLoading,
        memoizedTransactionList,
        memoizedTransactionTypeCount,
        activeTransationList,
        _getTransaksiList,
        _filterTransaksi,
        _onChangeTransactionList,
        _pollingTransaksiList,
    } = UseTransaksi();

    const [startSubscribePollingTransaksiList, stopSubscribePollingTransaksiList] = UsePolling(_pollingTransaksiList)

    const { colors } = useTheme();
    const _onPressCalendar = useCallback(() => log('_onPressCalendar Pressed'), [])
    const renderCardOrder = useCallback(({ item }) => <CardOrder order={{ ...item, menuName: item.items.map(({ menuName }) => ` ${menuName}`).toString(), tableNumber: '1' }} onPress={() => navigate('DetailOrder', { order: { ...item, tableNumber: '1' }, title: 'Pesanan Selesai' })} />, [])

    useEffect(() => {
        log('Mount TransTemp');
        _getTransaksiList();
        startSubscribePollingTransaksiList()
        return () => {
            log('Unmount TransTemp')
            stopSubscribePollingTransaksiList()
        }
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <MyText medium bold left black>Daftar Transaksi</MyText>
            </View>
            <MyToolBar
                data={[
                    {
                        label: `Berhasil ${memoizedTransactionTypeCount[0] > 0 ? `(${memoizedTransactionTypeCount[0]})` : ''}`,
                        icon: 'check-bold',
                        type: 'success',
                        color: colors.emerald
                    },
                    {
                        label: `Gagal ${memoizedTransactionTypeCount[1] > 0 ? `(${memoizedTransactionTypeCount[1]})` : ''}`,
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
                    refreshControl={
                        <RefreshControl
                            refreshing={transactionLoading}
                            onRefresh={() => {
                                _getTransaksiList(activeTransationList);
                                setTransactionLoading(true);
                                setTimeout(() => setTransactionLoading(false), 3000);
                            }}
                        />}
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