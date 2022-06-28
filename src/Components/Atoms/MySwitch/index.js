import { TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from 'react-native-paper';
import styles from './styles';
import Animated, {
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

export default props => {
    const { colors } = useTheme();

    const thumbStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(props?.value ? 21 : 0, { duration: 300 }) }]
    }))
    const trackStyle = useAnimatedStyle(() => ({
        backgroundColor: withTiming(props?.value ? colors.cerulean : colors.lightgray, { duration: 300 }),
    }))

    return (
        <TouchableOpacity
            activeOpacity={.8}
            onPress={() => props.onChange(!props?.value)}>
            <Animated.View
                style={[trackStyle, styles.track]}>
                <Animated.View style={[thumbStyle, styles.thumb]} />
            </Animated.View>
        </TouchableOpacity >
    )
};