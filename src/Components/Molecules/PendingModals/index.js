import { View, Image, StatusBar } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, } from 'react';
import { log, CONSTANT } from '@Utils';
import { useTheme, } from 'react-native-paper';
import { MyText, MyModal } from '@Atoms';
import { InputItems } from '@Molecules';
import { IC_PRODUCT_BIG } from '@Atoms/Icons';
import styles, { width, height } from './styles';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
export default forwardRef((props, ref) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [animationType, setAnimationType] = useState('slide');
    const [confirmed, setConfirmed] = useState(false);
    const imageSize = useSharedValue({
        width: '80%',
        height: '70%',
    })
    const imageSizeStyle = useAnimatedStyle(() => ({
        width: withSpring(imageSize.value.width, CONSTANT.SPRING_CONFIG),
        height: withSpring(imageSize.value.height, CONSTANT.SPRING_CONFIG),
    }))
    const drawerHeight = useSharedValue({
        height: height / 2,
        paddingTop: 24
    })
    const drawerHeightStyle = useAnimatedStyle(() => ({
        height: withSpring(drawerHeight.value.height, CONSTANT.SPRING_CONFIG),
        paddingTop: withSpring(drawerHeight.value.paddingTop, CONSTANT.SPRING_CONFIG),
    }))
    useImperativeHandle(ref, () => ({
        toggle,
    }));
    const toggle = useCallback(() => {
        log('_toggle : ')
        setModalVisible(prevState => !prevState);
    }, [modalVisible])
    const _onCloseModal = useCallback(() => {
        setAnimationType('fade')
        setModalVisible(prevState => !prevState);
        drawerHeight.value = {
            height: height / 2,
            paddingTop: 24
        }
        imageSize.value = {
            width: '80%',
            height: '70%',
        }
        setConfirmed(false);
    }, [modalVisible, animationType, confirmed]);
    const _onclick = useCallback(() => {
        log('_onclick : ');
        drawerHeight.value = {
            height: height - StatusBar.currentHeight,
            paddingTop: 100,
        }
        imageSize.value = {
            height: 30,
            width: 30,
        }
        setConfirmed(true);
    }, [confirmed])
    return (
        <MyModal
            visible={modalVisible}
            animationType={animationType}
            onRequestClose={_onCloseModal}
            statusBarTranslucent={true}
            contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}>
            <Animated.View style={[drawerHeightStyle, { width: width, backgroundColor: colors.white, borderTopLeftRadius: 16, borderTopRightRadius: 16 }]}>
                <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Animated.Image source={IC_PRODUCT_BIG} style={[imageSizeStyle, { alignSelf: 'center', borderRadius: 25 }]} />
                    {confirmed == false &&
                        <>
                            <MyText large bold color={colors.black} style={{ marginVertical: 4 }}>Perubahan Disimpan</MyText>
                            <MyText style={{ marginVertical: 4 }}>Selamat, perbahan menu berhasil disimpan</MyText>
                        </>}
                </View>
                {confirmed == false &&
                    <View style={{ width, padding: 12 }}>
                        <InputItems.MyButton
                            onPress={_onclick}
                            style={styles.button}
                            label={'Oke, Sip'} />
                    </View>}
            </Animated.View>
        </MyModal>
    )
})