import { View, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, memo, useRef, useCallback } from 'react';
import { log } from '@Utils';
import { useTheme, FAB } from 'react-native-paper';
import { MyText } from '@Atoms'
import { PagerView } from 'react-native-pager-view';
import styles from './styles';
import { CardOrder } from '@Organisms';
import { TopTabbar, EmptyOrderScreen } from '@Molecules';
import { MyToolBar } from '@Organisms';
import { UseOrder } from '@ViewModel';
import HomeModals from './HomeModals'
const INITIAL_PAGE = 0;
export default memo(({ navigation: { navigate } }) => {
    const {
        _subscribeOrders,
        _unSubscribeOrders,
        orderList,
        refreshingOrder,
        orderError,
        _onReachEnd,
        _onRefreshOrder,
    } = UseOrder()
    const { colors } = useTheme();
    const refPagerViewChild = useRef(<PagerView />);
    const refHomeModals = useRef(<HomeModals />);
    const ORDER_TYPES = ['PAID', 'CANCELED'];
    const TOOL = [
        {
            label: 'Selesai',
            icon: 'check-bold',
            type: ORDER_TYPES[0],
            color: colors.emerald
        },
        {
            label: 'Batal',
            icon: 'close-thick',
            type: ORDER_TYPES[1],
            color: colors.wildWaterMelon
        },
    ];

    const _onTabChange = useCallback((index) => refPagerViewChild.current?.setPage(index), [])
    const _onConfirmCalendar = useCallback(data => log('_onPressCalendar Pressed', data), [])
    const _onFABClick = () => {
        log('_onFABClick')
        refHomeModals?.current?.toggle()
    }
    const _renderCardOrder = useCallback(({ item }) =>
        <CardOrder
            order={{ ...item, menuName: item.items.map(({ menuName }) => ` ${menuName}`).toString() }}
            onPress={() => navigate('DetailOrder', { order: { id: item?.id, status: 'incoming' }, title: 'Konfirmasi Terima' })} />
        , []);

    const _onSelectedMejaCategory = (payload) => {
        navigate('ProductsList', { ...payload })
    }

    useEffect(() => {
        log('Mount HomeTemp');
        _subscribeOrders()
        return () => {
            log('Unmount HomeTemp')
            _unSubscribeOrders();
        }
    }, [])

    return (
        <View style={styles.container}>
            <TopTabbar onTabChange={_onTabChange} badgeCounts={[orderList?.length || 0,]} />
            <PagerView
                ref={refPagerViewChild}
                style={styles.pagerContainer}
                initialPage={INITIAL_PAGE}
                scrollEnabled={false}>
                <View key='0' style={{ flex: 1, paddingHorizontal: '5%', paddingBottom: 60 }}>
                    {orderError == '' &&
                        <FlatList
                            ListHeaderComponent={<MyText medium bold left black>List Pesanan</MyText>}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshingOrder}
                                    onRefresh={_onRefreshOrder}
                                />}
                            data={orderList}
                            renderItem={_renderCardOrder}
                            snapToInterval={150}
                            keyExtractor={({ id }) => id}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={<View style={{ height: 100 }} />}
                            ListEmptyComponent={orderList?.length > 0 ? <MyText light bold black>tunggu</MyText> : <EmptyOrderScreen />}
                            onEndReached={_onReachEnd}
                        />
                        || <MyText light bold black style={{ textAlign: 'center' }}>upss kita ada kendala nih... {`\n\n`}{orderError}</MyText>}
                    <FAB
                        icon="plus"
                        style={styles.FAB}
                        color={colors.white}
                        onPress={_onFABClick}
                    />
                </View>
                <View key='1' style={styles.pagerInnerContainer}>
                    <MyToolBar
                        tool={TOOL}
                        activeOrderList={ORDER_TYPES[0]}
                        listCount={1}
                        onPressChips={() => log('chips press')}
                        onConfirmCalendar={_onConfirmCalendar}
                        loading={true}
                    />
                    <FlatList
                        contentContainerStyle={styles.contentContainerStyle}
                        data={[]}
                        renderItem={_renderCardOrder}
                        snapToInterval={150}
                        keyExtractor={({ id }) => id}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => <MyText light bold black>ups, tidak ada data transaksi disini</MyText>}
                    />
                </View>
            </PagerView>
            <HomeModals
                ref={refHomeModals}
                onSelectedMejaCategory={_onSelectedMejaCategory}
            />
        </View>
    )
})
