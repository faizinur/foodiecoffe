import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, useEffect, } from 'react';
import { log } from '@Utils';
import { useTheme, } from 'react-native-paper';
import { MyText, MyModal } from '@Atoms';
import { InputItems } from '@Molecules';

import styles, { height } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IC_PRODUCT_DETAIL } from '@Atoms/Icons'
    ;
export default forwardRef((props, ref) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [animationType, setAnimationType] = useState('slide');
    const [modalType, setModalType] = useState('CHANGE');

    const toggle = useCallback((type = 'CHANGE') => {
        log('_toggle : ', type)
        setModalType(type)
        if (type == 'DETAIL') {
        }
        setModalVisible(prevState => !prevState);
    }, [modalVisible, modalType])

    const _onCloseModal = useCallback(() => {
        setAnimationType('fade')
        setModalVisible(prevState => !prevState);
    }, [modalVisible, animationType]);

    const _onClickPesan = () => {
        _onCloseModal()
        props.onChangeBucket()
    }
    useImperativeHandle(ref, () => ({
        toggle,
    }));

    useEffect(() => { }, [animationType])

    return (
        <MyModal
            visible={modalVisible}
            animationType={animationType}
            onRequestClose={_onCloseModal}
            statusBarTranslucent={true}
            contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={{ width: '100%', position: 'absolute', bottom: 0, left: 0, backgroundColor: colors.white, paddingHorizontal: '5%', paddingTop: '5%', borderTopLeftRadius: 15, borderTopRightRadius: 15, }}>
                <ScrollView
                    style={{ maxHeight: height * .755, minHeight: 180 }}
                    showsVerticalScrollIndicator={false}>
                    {modalType == 'CHANGE' &&
                        <>
                            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                                <Image source={IC_PRODUCT_DETAIL} style={{ marginBottom: 24, width: '100%', borderRadius: 12 }} />
                                <MyText left medium black style={{ marginVertical: 6 }}>Butter Scotch 1000ML</MyText>
                                <MyText left black style={{ marginVertical: 6 }}>Rp 888.888 <MyText strikeThrough>Rp 999.999</MyText></MyText>
                                <MyText left black style={{ marginVertical: 6 }} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non aenean viverra vitae aliquam. Quis ullamcorper integer nec nibh duis.</MyText>
                            </ScrollView>
                            <View style={{ width: '100%', height: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: '40%', height: 48, backgroundColor: colors.magnolia, borderRadius: 12, padding: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: colors.wildWaterMelon, justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon name={'minus'} color={colors.white} size={15} />
                                    </TouchableOpacity>
                                    <MyText bold medium black>1</MyText>
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
                                    label={'Tambahkan'}
                                    labelStyle={{ fontSize: 16 }} />
                            </View>
                        </>
                        ||
                        <>
                            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                                <MyText left medium black style={{ marginVertical: 6 }}>List Belanja</MyText>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 }}>
                                    <MyText left black >Caffe Americano Grande</MyText>
                                    <MyText left black >Rp 99.999</MyText>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 }}>
                                    <MyText left black ><Icon name={'brightness-percent'} color={colors.wildWaterMelon} /> Diskon</MyText>
                                    <MyText left >- Rp 19.999</MyText>
                                </View>
                            </ScrollView>
                            <View style={{ height: 2, backgroundColor: colors.athensGray }} />
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 10 }}>
                                <MyText left bold black >Total Pembayaran</MyText>
                                <MyText left bold black >Rp 80.000</MyText>
                            </View>
                        </>
                    }
                </ScrollView>
            </View>
        </MyModal>
    )
})