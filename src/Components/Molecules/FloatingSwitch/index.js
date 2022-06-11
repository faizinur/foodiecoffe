import { TouchableOpacity, PanResponder } from 'react-native';
import React, { memo, useCallback, useState, } from 'react';
import { log, CONSTANT } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms'
import styles, { width, height } from './styles';
import { useRiwayatTransaksi } from '@ViewModel';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
const RIGHT_THRESHOLD = (width - 120);
const LEFT_THRESHOLD = 100;
const TOP_THRESHOLD = 100;
const BOTTOM_THRESHOLD = (height - 120);
const POS_Y_MAX = (height - 212);
const POS_Y_MIN = 70;
const POS_X_MIN = 10;
const POS_X_MAX = (width - 210);
export default memo(() => {
    const [paidOrder, canceledOrder, _getRiwayatTransaksi] = useRiwayatTransaksi();
    const [activeOrderList, setActiveOrderList] = useState('paid')
    const { colors } = useTheme();
    const floatingSwitchPosition = useSharedValue({
        bottom: 70,
        left: (width / 2) - 100,
        width: 200,
        height: 50,
        padding: 10,
    });
    const floatingSwitchPositionStyle = useAnimatedStyle(() => ({
        bottom: withSpring(floatingSwitchPosition.value.bottom, CONSTANT.SPRING_CONFIG),
        left: withSpring(floatingSwitchPosition.value.left, CONSTANT.SPRING_CONFIG),
        width: withSpring(floatingSwitchPosition.value.width, CONSTANT.SPRING_CONFIG),
        height: withSpring(floatingSwitchPosition.value.height, CONSTANT.SPRING_CONFIG),
        padding: withSpring(floatingSwitchPosition.value.padding, CONSTANT.SPRING_CONFIG),
    }))

    const _switchList = useCallback((type) => (activeOrderList != type) && setActiveOrderList(type), [activeOrderList])

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, { moveY, moveX }) => {
            floatingSwitchPosition.value = {
                bottom: (height - moveY - 100),
                left: -(width - moveX - 400),
                width: 205,
                height: 55,
                padding: 12.5,
            }
        },
        onPanResponderRelease: (evt, { dy, dx, moveX, moveY }) => {
            log('onPanResponderRelease : ', height, moveY);
            if (moveX > 0 || moveX < POS_X_MAX || moveY > 100 || moveY < (height - 120)) {
                floatingSwitchPosition.value = {
                    // bottom,
                    ...floatingSwitchPosition.value,
                    width: 200,
                    height: 50,
                    padding: 10,
                }
            }
            // floatingSwitchPosition.value = {
            //     // bottom,
            //     ...floatingSwitchPosition.value,
            //     bottom: (moveY < TOP_THRESHOLD && POS_Y_MAX || moveY > BOTTOM_THRESHOLD && POS_Y_MIN || (height - 212)),
            //     left: (moveX > RIGHT_THRESHOLD && POS_X_MAX || moveX < POS_X_MIN || moveX),
            //     width: 200,
            //     height: 50,
            //     padding: 10,
            // }
        },
    })
    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[floatingSwitchPositionStyle, {
                backgroundColor: '#3A3A3A',
                opacity: .9,
                position: 'absolute',
                borderRadius: 12,
                justifyContent: 'center',
                flexDirection: 'row',
            }]}>
            <TouchableOpacity activeOpacity={.8} onPress={() => _switchList('paid')}
                style={{ width: 90, height: 30, borderRadius: 8, backgroundColor: activeOrderList == 'paid' ? '#6A6A6A' : 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                <MyText small center color={colors.white}>Selesai ({paidOrder.length})</MyText>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.8} onPress={() => _switchList('canceled')}
                style={{ width: '50%', height: '100%', borderRadius: 8, backgroundColor: activeOrderList == 'canceled' ? '#6A6A6A' : 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                <MyText small center color={colors.white}>Selesai ({canceledOrder.length})</MyText>
            </TouchableOpacity>
        </Animated.View>
    )
})
