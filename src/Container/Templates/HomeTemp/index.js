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
import HomeModals from './HomeModals'
import { UseOrder, UseMerchant } from '@ViewModel';
const INITIAL_PAGE = 0;
export default memo(({ navigation }) => {
    const {
        _getMerchant,
        merchantList,
        loading,
        merchantError,
    } = UseMerchant()
    const {
        _getOrders,
        orderList,
        refreshingOrder,
        setRefreshingOrder,
        orderError,
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
    const _onFABPress = useCallback(() =>
        refHomeModals.current?.toggle()
        , [])
    const _onPressCalendar = useCallback(() => log('_onPressCalendar Pressed'), [])
    const _renderCardOrder = useCallback(({ item }) => <CardOrder order={item} onPress={() => navigation.navigate('ConfirmOrder', { order: { ...item } })} />, []);
    useEffect(() => {
        log('Mount HomeTemp');
        _getOrders()
        _getMerchant()
        return () => {
            log('Unmount HomeTemp')
        }
    }, [])
    return (
        <View style={styles.container}>
            <TopTabbar onTabChange={_onTabChange} badgeCounts={[orderList.length,]} />
            <PagerView
                ref={refPagerViewChild}
                style={styles.pagerContainer}
                initialPage={INITIAL_PAGE}
                scrollEnabled={false}>
                <View key='0' style={{ flex: 1, paddingHorizontal: '5%', paddingBottom: 60 }}>
                    {orderError == '' &&
                        <FlatList
                            ListHeaderComponent={<MyText medium bold left color={colors.black}>List Pesanan</MyText>}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshingOrder}
                                    onRefresh={() => {
                                        _getOrders();
                                        setRefreshingOrder(true);
                                        setTimeout(() => setRefreshingOrder(false), 3000);
                                    }}
                                />}
                            data={refreshingOrder ? [] : orderList}
                            renderItem={_renderCardOrder}
                            snapToInterval={150}
                            keyExtractor={({ id }) => id}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={<View style={{ height: 100 }} />}
                            ListEmptyComponent={orderList.length > 0 ? <MyText light bold color={colors.black}>tunggu</MyText> : <EmptyOrderScreen />}
                        />
                        || <MyText light bold style={{ textAlign: 'center' }} color={colors.black}>upss kita ada kendala nih... {`\n\n`}{orderError}</MyText>}
                    <FAB
                        disabled={refreshingOrder}
                        theme={styles.fab}
                        style={styles.fabStyles}
                        color={colors.white}
                        icon="plus"
                        onPress={_onFABPress} />
                </View>
                <View key='1' style={styles.pagerInnerContainer}>
                    <MyToolBar
                        tool={TOOL}
                        activeOrderList={ORDER_TYPES[0]}
                        listCount={0}
                        onPressChips={() => log('chips press')}
                        onPressCalendar={_onPressCalendar}
                        loading={false}
                    />
                    <FlatList
                        contentContainerStyle={styles.contentContainerStyle}
                        data={[]}
                        renderItem={_renderCardOrder}
                        snapToInterval={150}
                        keyExtractor={({ id }) => id}
                        showsVerticalScrollIndicator={false}
                        // ListEmptyComponent={() => <MyText light bold color={colors.black}>{JSON.stringify(error) !== '""' ? error : 'Harap Tunggu...'}</MyText>}
                        ListEmptyComponent={() => <MyText light bold color={colors.black}>ups, tidak ada data transaksi disini</MyText>}
                    />
                </View>
            </PagerView>
            <HomeModals
                ref={refHomeModals}
                navigation={navigation}
                getMerchant={_getMerchant}
                merchantList={merchantList}
                loading={loading}
                merchantError={merchantError}
            />
        </View>
    )
})
