import { View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, memo, useRef, useCallback, } from 'react';
import { log } from '@Utils';
import { useTheme, FAB } from 'react-native-paper';
import { MyText } from '@Atoms'
import { PagerView } from 'react-native-pager-view';
import styles from './styles';
import { CardOrder } from '@Organisms';
import { TopTabbar, AccordionHistory, EmptyOrderScreen } from '@Molecules';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeModals from './HomeModals'
import { useRiwayatTransaksi } from '@ViewModel';
const INITIAL_PAGE = 0;
export default memo(({ navigation }) => {
    const [paidOrder, canceledOrder, _getRiwayatTransaksi] = useRiwayatTransaksi();
    const renderCardOrder = ({ item }) => <CardOrder {...item} />
    const { colors } = useTheme();
    const refPagerViewChild = useRef(<PagerView />);
    const refHomeModals = useRef(<HomeModals />);
    const _onTabChange = useCallback((index) => {
        refPagerViewChild.current?.setPage(index);
    }, [])
    const _onFABPress = useCallback(() => {
        log('_onFABPress Pressed : ');
        refHomeModals.current?.toggle()
    }, [])
    const _onPressCalendar = useCallback(() => {
        log('_onPressCalendar Pressed')
    }, [])
    const _onMount = async () => {
        await _getRiwayatTransaksi()
    }
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
                    <View style={styles.sectionTitle}>
                        <MyText small color={colors.black}>90 Total Pesanan</MyText>
                        <TouchableOpacity
                            onPress={_onPressCalendar}
                            activeOpacity={.8}
                            style={[styles.sectionTitle, styles.btnSection]}>
                            <Icon name='calendar-month' size={15} />
                            <MyText light color={colors.black}>28 Apr 2022</MyText>
                        </TouchableOpacity>
                    </View>
                    <AccordionHistory dataCount={paidOrder.length} title={'pesanan selesai'} leftIcon={'check'} color={colors.emerald}>
                        <FlatList
                            data={paidOrder}
                            renderItem={renderCardOrder}
                            keyExtractor={({ id }) => id}
                            showsVerticalScrollIndicator={false} />
                    </AccordionHistory>
                    <AccordionHistory dataCount={canceledOrder.length} title={'pesanan batal'} leftIcon={'close'} color={colors.wildWaterMelon}>
                        <FlatList
                            data={canceledOrder}
                            renderItem={renderCardOrder}
                            keyExtractor={({ id }) => id}
                            showsVerticalScrollIndicator={false} />
                    </AccordionHistory>
                </View>
            </PagerView>
            <HomeModals ref={refHomeModals} />
        </View>
    )
})
