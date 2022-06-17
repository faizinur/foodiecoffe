import { View, Modal, StatusBar } from 'react-native';
import React, { } from 'react';
import { log, CONSTANT } from '@Utils';
import styles from './styles';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
export default props => {
    const backDrop = useSharedValue({ backgroundColor: 'rgba(0,0,0,0)' })
    const backDropStyle = useAnimatedStyle(() => ({
        backgroundColor: withSpring(backDrop.value.backgroundColor, CONSTANT.SPRING_CONFIG),
    }))

    const _setBackdrop = () => {
        backDrop.value = { backgroundColor: backDrop.value.backgroundColor == 'rgba(0,0,0,0)' ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,0)' }

    }
    const _onRequestClose = () => {
        if ('disableBack' in props && props?.disableBack == true) return false;
        _setBackdrop()
        setTimeout(() => { 'onRequestClose' in props && props.onRequestClose() }, 400)
    }
    const _onShowModal = () => {
        if ('onShow' in props) props.onShow()
        setTimeout(() => { _setBackdrop() }, 100);
    }
    return (
        <Modal
            animationType={props?.animationType || 'slide'}
            transparent={true}
            visible={props?.visible || false}
            statusBarTranslucent={props?.statusBarTranslucent}
            onRequestClose={_onRequestClose}
            hardwareAccelerated={true}
            onShow={_onShowModal}>
            <Animated.View style={[backDropStyle, styles.wrapper, { paddingTop: props?.statusBarTranslucent ? StatusBar.currentHeight : 0 }]}>
                <View style={'contentContainerStyle' in props ? props.contentContainerStyle : styles.container}>
                    {props?.children}
                </View>
            </Animated.View>
        </Modal >
    )
}