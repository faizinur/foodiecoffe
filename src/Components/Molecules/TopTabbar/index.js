import { View, TouchableOpacity } from 'react-native';
import React, { memo, useRef, useCallback, useEffect } from 'react';
import { MyText } from '@Atoms'
import styles, { width } from './styles';
import { log, CONSTANT } from '@Utils'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';

export default memo((props) => {
    let tabPosition = [
        { title: 'Pesanan', position: 7.5, ref: useRef(null) },
        { title: 'Riwayat', position: width * .44, ref: useRef(null) },
    ];
    const xPosSlider = useSharedValue({ left: 7.5 })
    const xPosSliderStyle = useAnimatedStyle(() => ({
        left: withSpring(xPosSlider.value.left, CONSTANT.SPRING_CONFIG),
    }))
    const _onTabPres = useCallback(tabIndex => {
        tabPosition[0].ref.current?.setNativeProps({ style: { fontFamily: tabIndex == 0 ? 'ReadexProBold' : 'ReadexProLight' } })
        tabPosition[1].ref.current?.setNativeProps({ style: { fontFamily: tabIndex == 1 ? 'ReadexProBold' : 'ReadexProLight' } })
        xPosSlider.value = { left: tabPosition[tabIndex].position };
        'onTabChange' in props && props?.onTabChange(tabIndex);
    }, []);
    useEffect(() => {
        _onTabPres(0)
        return () => { }
    }, [])
    return (
        <View style={styles.sliderContainer}>
            <View style={styles.sliderWrapper}>
                <Animated.View style={[styles.slider, xPosSliderStyle]} />
                {tabPosition.map(({ title, ref }, index) =>
                    <TouchableOpacity
                        key={`tab${title}`}
                        activeOpacity={.8}
                        onPress={() => _onTabPres(index)}
                        style={styles.tabItem}>
                        <MyText ref={ref} center>{title}{`${props.badgeCounts[index] > 0 ? `(${props.badgeCounts[index]})` : ``}`}</MyText>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
})
