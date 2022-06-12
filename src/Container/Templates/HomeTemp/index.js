import { View, FlatList } from 'react-native';
import React, { useEffect, memo, useRef, useCallback, } from 'react';
import { log } from '@Utils';
import { useTheme, FAB } from 'react-native-paper';
import { MyText } from '@Atoms'
import { PagerView } from 'react-native-pager-view';
import styles from './styles';
import { CardOrder } from '@Organisms';
import { TopTabbar, EmptyOrderScreen } from '@Molecules';
import { MyToolBar } from '@Organisms';
import HomeModals from './HomeModals'
import { UseHomeVM } from '@ViewModel';
const INITIAL_PAGE = 0;
export default memo(({ navigation }) => {
    const {
        error,
        loading,
        orderList,
        activeOrderList,
        _getRiwayatTransaksi,
        ORDER_TYPES
    } = UseHomeVM();
    const renderCardOrder = ({ item }) => <CardOrder {...item} />
    const { colors } = useTheme();
    const refPagerViewChild = useRef(<PagerView />);
    const refHomeModals = useRef(<HomeModals />);

    const _onTabChange = useCallback((index) => refPagerViewChild.current?.setPage(index), [])
    const _onFABPress = useCallback(() => refHomeModals.current?.toggle(), [])
    const _onPressCalendar = useCallback(() => log('_onPressCalendar Pressed'), [])
    const _getTransaksi = async (transactionType) => await _getRiwayatTransaksi(transactionType)
    useEffect(() => {
        log('Mount HomeTemp');
        _getTransaksi()
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
                <View key='0' style={styles.pagerInnerContainer}>
                    <MyText medium bold left color={colors.black}>List Pesanan</MyText>
                    <EmptyOrderScreen />
                    <FAB
                        theme={styles.fab}
                        style={styles.fabStyles}
                        color={colors.white}
                        icon="plus"
                        onPress={_onFABPress} />
                </View>
                <View key='1' style={styles.pagerInnerContainer}>
                    <MyToolBar
                        activeOrderList={activeOrderList}
                        listCount={orderList.length}
                        onPressChips={_getTransaksi}
                        onPressCalendar={_onPressCalendar}
                    />
                    <FlatList
                        contentContainerStyle={styles.contentContainerStyle}
                        data={loading ? [] : orderList}
                        renderItem={renderCardOrder}
                        snapToInterval={150}
                        keyExtractor={({ id }) => id}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => <MyText light bold color={colors.black}>{JSON.stringify(error) !== '""' ? error : 'Harap Tunggu...'}</MyText>}
                    />
                </View>
            </PagerView>
            <HomeModals ref={refHomeModals} />
        </View>
    )
})
