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
import { UseOrder } from '@ViewModel';
const INITIAL_PAGE = 0;
export default memo(({ navigation }) => {
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
    // const _getTransaksi = async (transactionType) => await _getRiwayatTransaksi(transactionType)
    // const _getTransaksiNew = async (transactionType) => await _getNewTransaksi(transactionType)
    const _renderCardOrder = ({ item }) => <CardOrder {...item} onPress={() => log('adbjsadjk')} />
    useEffect(() => {
        log('Mount HomeTemp');
        // _getTransaksi()
        // _getTransaksiNew()
        _getOrders()
        return () => {
            log('Unmount HomeTemp')
        }
    }, [])
    return (
        <View style={styles.container}>
            <TopTabbar onTabChange={_onTabChange} />
            <PagerView
                ref={refPagerViewChild}
                style={styles.pagerContainer}
                initialPage={INITIAL_PAGE}
                scrollEnabled={false}>
                <View key='0' style={{ flex: 1, paddingHorizontal: '5%', paddingBottom: 60 }}>
                    {orderError == '' &&
                        <>
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
                                ListEmptyComponent={orderList.length > 0 ? <MyText>tunggu</MyText> : <EmptyOrderScreen />}
                            />
                            <FAB
                                theme={styles.fab}
                                style={styles.fabStyles}
                                color={colors.white}
                                icon="plus"
                                onPress={_onFABPress} />
                        </>
                        || <MyText>upss error...</MyText>}
                </View>
                <View key='1' style={styles.pagerInnerContainer}>
                    {/* <MyToolBar
                        tool={TOOL}
                        activeOrderList={activeOrderList}
                        listCount={orderLists.length}
                        // onPressChips={_getTransaksi}
                        onPressCalendar={_onPressCalendar}
                        loading={loading}
                    />
                    <FlatList
                        contentContainerStyle={styles.contentContainerStyle}
                        data={loading ? [] : orderLists}
                        renderItem={_renderCardOrder}
                        snapToInterval={150}
                        keyExtractor={({ id }) => id}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => <MyText light bold color={colors.black}>{JSON.stringify(error) !== '""' ? error : 'Harap Tunggu...'}</MyText>}
                    /> */}
                </View>
            </PagerView>
            <HomeModals ref={refHomeModals} navigation={navigation} />
        </View>
    )
})
