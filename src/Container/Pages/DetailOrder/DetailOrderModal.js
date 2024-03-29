import { View, Image, StatusBar } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, useEffect } from 'react';
import { log, CONSTANT } from '@Utils';
import { useTheme, } from 'react-native-paper';
import { MyText, MyModal } from '@Atoms';
import { InputItems } from '@Molecules';
import { IC_ACCEPT, IC_REJECT, } from '@Atoms/Icons';
import { height } from './styles';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
let modalType = '';
export default forwardRef((props, ref) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [animationType, setAnimationType] = useState('slide');
    const [imageSource, setImageSource] = useState(null);
    const [textTitle, setTextTitle] = useState('');
    const [btnBackground, setBtnBackground] = useState(colors.cerulean);
    const [textDescription, setTextDescription] = useState('');
    const [loading, setLoading] = useState(false);


    const DOWN_SIZE = height * .5;
    const UP_SIZE = height;

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

    const toggle = useCallback((type = 'accept') => {
        modalType = type;
        setImageSource(modalType == 'accept' ? IC_ACCEPT : IC_REJECT);
        setTextTitle(modalType == 'accept' ? 'Terima Orderan?' : 'Tolak Orderan?');
        setTextDescription(modalType == 'accept' ? 'Jangan lupa pastikan kembali pesanannya' : 'Kamu yakin ingin menolak orderan ini?');
        setBtnBackground(modalType == 'accept' ? colors.cerulean : colors.wildWaterMelon);
        setModalVisible(prevState => !prevState);
    }, [modalVisible, imageSource, textTitle, textDescription])

    const _onCloseModal = useCallback(() => {
        // setAnimationType('fade')
        // setModalVisible(prevState => !prevState);
        // drawerHeight.value = { height: DOWN_SIZE }
        // imageSize.value = { width: '100%', height: '50%' }
        return false;
    }, [modalVisible, animationType]);

    const _onclick = useCallback(async () => {
        log('_onclick : ');
        if (drawerHeight.value.height == UP_SIZE) {
            setAnimationType('fade')
            setModalVisible(prevState => !prevState);
            setImageSource(null)
            setTextTitle('')
            setTextDescription('')
            setBtnBackground(colors.cerulean);
            drawerHeight.value = { height: DOWN_SIZE }
            imageSize.value = { width: '100%', height: '50%' }
            props?.onConfirm({ status: modalType });
            return false;
        }
        setLoading(true);
        modalType == 'accept' ? await props?.acceptAction() : await props?.rejectAction()
        setTextTitle(modalType == 'accept' ? 'Orderan Di Terima' : 'Orderan Di Tolak');
        setTextDescription(modalType == 'accept' ? 'Selamat oreran berhasil di lakukan' : 'Selamat oreran berhasil di tolak');
        drawerHeight.value = { height: UP_SIZE }
        imageSize.value = { width: '30%', height: '40%' }
        setLoading(false);

    }, [drawerHeight, imageSize, imageSource, textTitle, textDescription, loading])

    useImperativeHandle(ref, () => ({
        accept: () => toggle('accept'),
        reject: () => toggle('reject'),
    }));

    useEffect(() => { }, [animationType])

    return (
        <MyModal
            disableBack={false}
            visible={modalVisible}
            animationType={animationType}
            onRequestClose={_onCloseModal}
            statusBarTranslucent={true}
            contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}>
            <Animated.View style={[drawerHeightStyle, { minHeight: DOWN_SIZE, maxHeight: UP_SIZE, width: '100%', backgroundColor: colors.white, borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingHorizontal: '5%' }]}>
                <View style={{ flex: 1 }} />
                <View style={{ width: '100%', height: DOWN_SIZE * .6 }}>
                    <Animated.Image source={imageSource} resizeMode={'cover'} style={[imageSizeStyle, { alignSelf: 'center', borderRadius: 25 }]} />
                    <MyText large bold black style={{ marginTop: 24 }}>{textTitle}</MyText>
                    <MyText style={{ marginBottom: 24 }}>{textDescription}</MyText>
                    <InputItems.MyButton
                        disabled={loading}
                        loading={loading}
                        onPress={_onclick}
                        contentStyle={{ backgroundColor: btnBackground }}
                        label={'Oke'} />
                </View>
                <View style={{ flex: 1 }} />
            </Animated.View>
        </MyModal>
    )
})