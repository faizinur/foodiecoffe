import { View, FlatList } from 'react-native';
import React, { useEffect, memo, useCallback } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import { CardOrder, MyToolBar } from '@Organisms';
import { UseTransaksi } from '@ViewModel';
import styles from './styles';
export default memo(({ navigation }) => {
    const {
        errorTransaksi,
        loading,
        transactionList,
        activeTransationList,
        _getTransaksiList,
        ORDER_TYPES,
        _filterTransaksi,
    } = UseTransaksi();

    const { colors } = useTheme();
    const _onPressCalendar = useCallback(() => log('_onPressCalendar Pressed'), [])
    const renderCardOrder = ({ item }) => <></>//<CardOrder order={item} />
    useEffect(() => {
        log('Mount TransTemp');
        // _getTransaksiList()
        return () => {
            log('Unmount TransTemp')
        }
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <MyText medium bold left black>Daftar Transaksi</MyText>
            </View>
            <MyToolBar
                tool={[
                    {
                        label: 'Di bayar',
                        icon: 'check-bold',
                        type: ORDER_TYPES[0],
                        color: colors.emerald
                    },
                    {
                        label: 'Ngutang',
                        icon: 'close-thick',
                        type: ORDER_TYPES[1],
                        color: colors.wildWaterMelon
                    },
                ]}
                activeOrderList={activeTransationList}
                listCount={transactionList.length}
                onPressChips={_getTransaksiList}
                onPressCalendar={_onPressCalendar}
                loading={loading}
                onChoosenCalendar={_filterTransaksi}
            />
            <View style={styles.content}>
                <FlatList
                    contentContainerStyle={styles.contentContainerStyle}
                    data={loading ? [] : transactionList}
                    renderItem={renderCardOrder}
                    snapToInterval={150}
                    keyExtractor={({ id }) => id}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => <MyText light bold black>{JSON.stringify(errorTransaksi) !== '""' ? errorTransaksi : 'Harap Tunggu...'}</MyText>}
                />
            </View>
        </View>
    )
})