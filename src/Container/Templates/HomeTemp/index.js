import { View, TouchableOpacity, Animated, Image } from 'react-native';
import React, { useEffect, memo, useRef, useCallback, } from 'react';
import { log } from '@Utils';
import { useTheme, FAB } from 'react-native-paper';
import { MyText } from '@Atoms'
import { PagerView } from 'react-native-pager-view';
import styles from './styles';
import { CardOrder } from '@Organisms';
import { IC_APP } from '@Atoms/Icons'

export default memo(({ navigation }) => {
    const { colors } = useTheme();
    const refPagerViewChild = useRef(<PagerView />);
    const sliderAnimationRef = React.useRef(new Animated.Value(0)).current;;
    let tabPosition = [0, 0];
    const _onTabPres = useCallback(tabIndex => {
        Animated.timing(sliderAnimationRef, {
            toValue: tabPosition[tabIndex],
            duration: 250,
            useNativeDriver: true,
        }).start(() => {
            refPagerViewChild.current?.setPage(tabIndex);
        })
    }, []);
    useEffect(() => {
        log('Mount HomeTemp');
        return () => {
            log('Unmount HomeTemp')
        }
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.sliderContainer}>
                <View style={styles.sliderWrapper}>
                    <Animated.View style={{ ...styles.slider, transform: [{ translateX: sliderAnimationRef }] }} />
                    <TouchableOpacity
                        onLayout={({ nativeEvent: { layout: { x } } }) => { tabPosition[0] = x }}
                        activeOpacity={.8}
                        onPress={() => _onTabPres(0)}
                        style={styles.tabItem}>
                        <MyText center>Pesanan</MyText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onLayout={({ nativeEvent: { layout: { x } } }) => { tabPosition[1] = x - 15 }}
                        activeOpacity={.8}
                        onPress={() => _onTabPres(1)}
                        style={styles.tabItem}>
                        <MyText center>Riwayat</MyText>
                    </TouchableOpacity>
                </View>
            </View>
            <PagerView
                ref={refPagerViewChild}
                style={styles.pagerContainer}
                initialPage={0}
                scrollEnabled={false}
            >
                <View key='0' style={styles.pagerInnerContainer}>
                    <MyText medium bold color={colors.black}>List Pesanan</MyText>
                    <CardOrder />
                    {/* <View style={styles.content}>
                        <View style={styles.pendingImageContainer}>
                            <Image source={IC_APP} />
                        </View>
                        <MyText fontSize={24} lineHeight={30} center bold color={colors.black}>Menunggu Pesanan</MyText>
                        <MyText fontSize={14} lineHeight={20} bold center style={{ textAlign: 'center' }}>Saat ini belum ada pesanan yang masuk atau dipesan.</MyText>
                    </View> */}
                </View>
                <View key='1' style={styles.pagerInnerContainer}>
                    <MyText>Riwayat</MyText>
                </View>
            </PagerView>
            <FAB
                theme={styles.fab}
                style={styles.fabStyles}
                color={colors.white}
                icon="plus"
                onPress={() => log('Pressed')}
            />
        </View>
    )
})
