import { View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, memo, useRef, useCallback, useState, } from 'react';
import { log } from '@Utils';
import { useTheme, FAB, Chip } from 'react-native-paper';
import { MyText } from '@Atoms'
import { PagerView } from 'react-native-pager-view';
import styles from './styles';
import { CardOrder } from '@Organisms';
import { TopTabbar, EmptyOrderScreen } from '@Molecules';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeModals from './HomeModals'
import { useRiwayatTransaksi } from '@ViewModel';
const INITIAL_PAGE = 0;
export default memo(({ navigation }) => {
    const [paidOrder, canceledOrder, _getRiwayatTransaksi] = useRiwayatTransaksi();
    const [activeOrderList, setActiveOrderList] = useState('paid');
    const renderCardOrder = ({ item }) => <CardOrder {...item} />
    const { colors } = useTheme();
    const refPagerViewChild = useRef(<PagerView />);
    const refHomeModals = useRef(<HomeModals />);

    const _onTabChange = useCallback((index) => refPagerViewChild.current?.setPage(index), [])
    const _onFABPress = useCallback(() => refHomeModals.current?.toggle(), [])
    const _onPressCalendar = useCallback(() => log('_onPressCalendar Pressed'), [])
    const _onMount = async () => await _getRiwayatTransaksi()
    const _switchList = useCallback((type) => (activeOrderList != type) && setActiveOrderList(type), [activeOrderList])

    useEffect(() => {
        log('Mount HomeTemp');
        _onMount()
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
                    <View style={styles.sectionContainer}>
                        <View style={styles.chipsContainer}>
                            <Chip
                                mode={'outlined'}
                                selected={activeOrderList == 'paid'}
                                selectedColor={activeOrderList == 'paid' ? colors.emerald : colors.jumbo}
                                onPress={() => _switchList('paid')}
                                style={styles.chip} textStyle={styles.chipText}>Success ({paidOrder.length})</Chip>
                            <Chip
                                mode={'outlined'}
                                selected={activeOrderList == 'canceled'}
                                selectedColor={activeOrderList == 'canceled' ? colors.wildWaterMelon : colors.jumbo}
                                onPress={() => _switchList('canceled')}
                                style={styles.chip} textStyle={styles.chipText}>Failed ({canceledOrder.length})</Chip>
                        </View>
                        <TouchableOpacity
                            onPress={_onPressCalendar}
                            activeOpacity={.8}
                            style={styles.btnSection}>
                            <Icon name='calendar-month' size={15} />
                            <MyText light color={colors.black}>28 Apr 2022</MyText>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        contentContainerStyle={styles.contentContainerStyle}
                        data={activeOrderList == 'paid' ? paidOrder : canceledOrder}
                        renderItem={renderCardOrder}
                        snapToInterval={150}
                        keyExtractor={({ id }) => id}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </PagerView>
            <HomeModals ref={refHomeModals} />
        </View>
    )
})
