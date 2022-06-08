import { View, TouchableOpacity, Animated } from 'react-native';
import React, { memo, useRef, useCallback, } from 'react';
import { MyText } from '@Atoms'
import styles from './styles';

export default memo((props) => {
    const refSliderAnimation = React.useRef(new Animated.Value(0)).current;
    const refTabPesanan = useRef(null);
    const refTabRiwayat = useRef(null);
    let tabPosition = [0, 0];
    const _onTabPres = useCallback(tabIndex => {
        Animated.timing(refSliderAnimation, {
            toValue: tabPosition[tabIndex],
            duration: 250,
            useNativeDriver: true,
        }).start(() => {
            refTabPesanan.current?.setNativeProps({ style: { fontFamily: tabIndex == 0 ? 'ReadexProBold' : 'ReadexProLight' } })
            refTabRiwayat.current?.setNativeProps({ style: { fontFamily: tabIndex == 1 ? 'ReadexProBold' : 'ReadexProLight' } })
            'onTabChange' in props && props?.onTabChange(tabIndex);
        })
    }, []);
    return (
        <View style={styles.sliderContainer}>
            <View style={styles.sliderWrapper}>
                <Animated.View style={[styles.slider, { transform: [{ translateX: refSliderAnimation }] }]} />
                <TouchableOpacity
                    onLayout={({ nativeEvent: { layout: { x } } }) => { tabPosition[0] = x }}
                    activeOpacity={.8}
                    onPress={() => _onTabPres(0)}
                    style={styles.tabItem}>
                    <MyText ref={refTabPesanan} center bold>Pesanan</MyText>
                </TouchableOpacity>
                <TouchableOpacity
                    onLayout={({ nativeEvent: { layout: { x } } }) => { tabPosition[1] = x - 15 }}
                    activeOpacity={.8}
                    onPress={() => _onTabPres(1)}
                    style={styles.tabItem}>
                    <MyText ref={refTabRiwayat} center>Riwayat</MyText>
                </TouchableOpacity>
            </View>
        </View>
    )
})
