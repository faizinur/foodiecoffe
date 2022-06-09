import { TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { useTheme } from 'react-native-paper';
import { log, CONSTANT } from '@Utils';
import styles from './styles';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const START_X_POS = 3;
const END_X_POS = 23;
const MySwitch = props => {
    const { colors } = useTheme();
    let ACTIVE_COLOR = 'color' in props ? props?.color : colors.cerulean;
    let INAVTIVE_COLOR = colors.lightgray;
    const xPos = useSharedValue(3);
    const bgColor = useSharedValue({ backgroundColor: INAVTIVE_COLOR })
    const xPosStyle = useAnimatedStyle(() => ({
        left: withSpring(xPos.value, CONSTANT.SPRING_CONFIG)
    }))
    const bgColorStyle = useAnimatedStyle(() => ({
        backgroundColor: withTiming(bgColor.value.backgroundColor, { duration: 10 })
    }))

    const _onSwitchPresss = useCallback((initialValue = START_X_POS) => {
        xPos.value = (initialValue == START_X_POS ? END_X_POS : START_X_POS);
        bgColor.value = { backgroundColor: (initialValue == START_X_POS ? ACTIVE_COLOR : INAVTIVE_COLOR) }
        // 'onValueChange' in props && props?.onValueChange(initialValue == START_X_POS)
    }, [])

    useEffect(() => {
        if (props?.disabled == true) {
            bgColor.value = { backgroundColor: colors.moonRaker }
        } else {
            _onSwitchPresss(props?.value ? START_X_POS : END_X_POS)
        }
        return () => { }
    }, [])
    return (
        <TouchableOpacity
            disabled={props?.disabled}
            activeOpacity={.8}
            onPress={() => _onSwitchPresss(xPos.value)}>
            <Animated.View
                style={[bgColorStyle, styles.switch]}>
                <Animated.View style={[xPosStyle, styles.slider]} />
            </Animated.View>
        </TouchableOpacity>
    )
}

MySwitch.defaultProps = {
    value: false,
    disabled: false,
    onValueChange: 'function'
}

export default MySwitch;