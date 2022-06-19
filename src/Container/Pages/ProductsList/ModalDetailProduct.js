import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, } from 'react';
import { log, CONSTANT } from '@Utils';
import { useTheme, } from 'react-native-paper';
import { MyText, MyModal } from '@Atoms';
import { InputItems } from '@Molecules';

import styles, { width, height } from './styles';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IC_PRODUCT_DETAIL } from '@Atoms/Icons'
    ;
export default forwardRef((props, ref) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [animationType, setAnimationType] = useState('slide');
    const [modalType, setModalType] = useState('CHANGE');


    const DOWN_SIZE = height * .65;
    const DOWN_SIZE_DETAIL = height * .4;
    const UP_SIZE = height;


    const drawerHeight = useSharedValue({
        height: height / 2,
    })

    const drawerHeightStyle = useAnimatedStyle(() => ({
        height: withSpring(drawerHeight.value.height, CONSTANT.SPRING_CONFIG),
    }))

    const toggle = useCallback((type = 'CHANGE') => {
        log('_toggle : ', type)
        setModalType(type)
        if (type == 'DETAIL') {
            log('yak detail')
            drawerHeight.value = { height: 100 }
        }
        setModalVisible(prevState => !prevState);
    }, [modalVisible, modalType])

    const _onCloseModal = useCallback(() => {
        setAnimationType('fade')
        setModalVisible(prevState => !prevState);
        drawerHeight.value = { height: DOWN_SIZE }
    }, [modalVisible, animationType]);

    const _onClickPesan = () => {
        _onCloseModal()
        props.onChangeBucket()
    }
    useImperativeHandle(ref, () => ({
        toggle,
    }));

    return (
        <MyModal
            visible={modalVisible}
            animationType={animationType}
            onRequestClose={_onCloseModal}
            statusBarTranslucent={true}
            contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}>
            <Animated.View style={[drawerHeightStyle, { minHeight: modalType == 'CHANGE' ? DOWN_SIZE : DOWN_SIZE_DETAIL, maxHeight: UP_SIZE, width: '100%', backgroundColor: colors.white, borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingHorizontal: '5%' }]}>
                <View style={{ height: 4, width: 30, borderRadius: 10, marginBottom: 12, alignSelf: 'center', backgroundColor: colors.athensGray, marginVertical: 4 }} />
                {modalType == 'CHANGE' &&
                    <>
                        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                            <Image source={IC_PRODUCT_DETAIL} style={{ marginBottom: 24, width: '100%', borderRadius: 12 }} />
                            <MyText left medium color={colors.black} style={{ marginVertical: 6 }}>Butter Scotch 1000ML</MyText>
                            <MyText left color={colors.black} style={{ marginVertical: 6 }}>Rp 888.888 <MyText strikeThrough>Rp 999.999</MyText></MyText>
                            <MyText left color={colors.black} style={{ marginVertical: 6 }} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non aenean viverra vitae aliquam. Quis ullamcorper integer nec nibh duis.</MyText>
                        </ScrollView>
                        <View style={{ width: '100%', height: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: '40%', height: 48, backgroundColor: colors.magnolia, borderRadius: 12, padding: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: colors.wildWaterMelon, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name={'minus'} color={colors.white} size={15} />
                                </TouchableOpacity>
                                <MyText bold medium color={colors.black}>1</MyText>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: colors.wildWaterMelon, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name={'plus'} color={colors.white} size={15} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '10%' }} />
                            <InputItems.MyButton
                                onPress={_onClickPesan}
                                style={[styles.button, { width: '40%', marginVertical: 15 }]}
                                label={'Pesan'}
                                labelStyle={{ fontSize: 16 }} />
                        </View>
                    </>
                    ||
                    <>
                        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                            <MyText left medium color={colors.black} style={{ marginVertical: 6 }}>List Belanja</MyText>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 }}>
                                <MyText left color={colors.black} >Caffe Americano Grande</MyText>
                                <MyText left color={colors.black} >Rp 99.999</MyText>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 }}>
                                <MyText left color={colors.black} ><Icon name={'brightness-percent'} color={colors.wildWaterMelon} /> Diskon</MyText>
                                <MyText left >- Rp 19.999</MyText>
                            </View>
                        </ScrollView>
                        <View style={{ height: 2, backgroundColor: colors.athensGray }} />
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 10 }}>
                            <MyText left bold color={colors.black} >Total Pembayaran</MyText>
                            <MyText left bold color={colors.black} >Rp 80.000</MyText>
                        </View>
                    </>
                }
            </Animated.View>
        </MyModal>
    )
})