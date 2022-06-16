import { View, Image, StatusBar } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, } from 'react';
import { log, CONSTANT } from '@Utils';
import { useTheme, } from 'react-native-paper';
import { MyText, MyModal } from '@Atoms';
import { InputItems } from '@Molecules';
import { IC_PAYMENT_FAILED, IC_PAYMENT_SUCCESS, IC_PAYMENT_INFO } from '@Atoms/Icons';
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

    const [imageSource, setImageSource] = useState(IC_PAYMENT_INFO);
    const [textTitle, setTextTitle] = useState('Lanjut Pembayaran?');
    const [textDescription, setTextDescription] = useState('Jangan lupa pastikan kembali pesanan kamu');

    const DOWN_SIZE = height * .6;
    const UP_SIZE = height * .9;

    const imageSize = useSharedValue({
        width: '100%',
        height: '50%',
    })
    const imageSizeStyle = useAnimatedStyle(() => ({
        width: withSpring(imageSize.value.width, CONSTANT.SPRING_CONFIG),
        height: withSpring(imageSize.value.height, CONSTANT.SPRING_CONFIG),
    }))
    const drawerHeight = useSharedValue({
        height: height / 2,
    })
    const drawerHeightStyle = useAnimatedStyle(() => ({
        height: withSpring(drawerHeight.value.height, CONSTANT.SPRING_CONFIG),
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
        setImageSource(IC_PAYMENT_INFO)
        setTextTitle('Lanjut Pembayaran?')
        setTextDescription('Jangan lupa pastikan kembali pesanan kamu')
        setModalVisible(prevState => !prevState);
        drawerHeight.value = {
            height: height / 2,
        }
        imageSize.value = {
            width: '80%',
            height: '70%',
        }
    }, [modalVisible, animationType, imageSource, textTitle, textDescription]);
    const _onclick = useCallback(() => {
        log('_onclick : ');
        const result = ['SUCCESS', 'FAILED'];
        if (result[Math.round(Math.random() * 1)] == 'SUCCESS') {
            setImageSource(IC_PAYMENT_SUCCESS)
            setTextTitle('Pembayaran berhasil')
            setTextDescription('Selamat pembayaranmu berhasil di lakukan, silahkan order kembali')
        } else {
            setImageSource(IC_PAYMENT_FAILED)
            setTextTitle('Oops, Terjadi Kesalahan')
            setTextDescription('Maaf terjadi kesalahan, cek kembali koneksi intenet kamu')
        }

        drawerHeight.value = {
            height: drawerHeight.value.height > DOWN_SIZE ? DOWN_SIZE : UP_SIZE,
        }
        imageSize.value = {
            width: imageSize.value.width == '30%' ? '100%' : '30%',
            height: imageSize.value.height == '40%' ? '50%' : '40%',
        }
    }, [drawerHeight, imageSize, imageSource, textTitle, textDescription])
    return (
        <MyModal
            visible={modalVisible}
            animationType={animationType}
            onRequestClose={_onCloseModal}
            statusBarTranslucent={true}
            contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}>
            <Animated.View style={[drawerHeightStyle, { minHeight: DOWN_SIZE, maxHeight: UP_SIZE, width: '100%', backgroundColor: colors.white, borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingHorizontal: '5%', paddingBottom: 60, paddingTop: '5%' }]}>
                <View style={{ flex: 1 }} />
                <View style={{ width: '100%', height: DOWN_SIZE * .6 }}>
                    <Animated.Image source={imageSource} style={[imageSizeStyle, { alignSelf: 'center', borderRadius: 25 }]} />

                    <MyText large bold color={colors.black} style={{ marginVertical: 4 }}>{textTitle}</MyText>
                    <MyText style={{ marginVertical: 4 }}>{textDescription}</MyText>
                </View>
                <View style={{ flex: 1 }} />
                <View style={{ width, padding: 12, position: 'absolute', bottom: 0, left: 0 }}>
                    <InputItems.MyButton
                        onPress={_onclick}
                        style={styles.button}
                        label={'Oke, Sip'} />
                </View>
            </Animated.View>
        </MyModal>
    )
})