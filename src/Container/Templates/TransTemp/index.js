import { View, FlatList } from 'react-native';
import React, { useEffect, memo, useCallback } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import { CardOrder, MyToolBar } from '@Organisms';
import { UseTransaksiVM } from '@ViewModel';
import styles from './styles';
export default memo(({ navigation }) => {
    const {
        error,
        loading,
        orderList,
        activeOrderList,
        _getDaftarTransaksi,
        ORDER_TYPES
    } = UseTransaksiVM();

    const { colors } = useTheme();
    const _onPressCalendar = useCallback(() => log('_onPressCalendar Pressed'), [])
    const _getTransaksi = async (transactionType) => await _getDaftarTransaksi(transactionType);
    const renderCardOrder = ({ item }) => <CardOrder {...item} />
    useEffect(() => {
        log('Mount TransTemp');
        _getTransaksi()
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
                activeOrderList={activeOrderList}
                listCount={orderList.length}
                onPressChips={_getTransaksi}
                onPressCalendar={_onPressCalendar}
                loading={loading}
            />
            <View style={styles.content}>
                <FlatList
                    contentContainerStyle={styles.contentContainerStyle}
                    data={loading ? [] : orderList}
                    renderItem={renderCardOrder}
                    snapToInterval={150}
                    keyExtractor={({ id }) => id}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => <MyText light bold black>{JSON.stringify(error) !== '""' ? error : 'Harap Tunggu...'}</MyText>}
                />
            </View>
        </View>
    )
})