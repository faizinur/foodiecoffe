import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, useEffect, } from 'react';
import { log } from '@Utils';
import { useTheme, } from 'react-native-paper';
import { MyText, MyModal, MyImage } from '@Atoms';
import { InputItems } from '@Molecules';

import styles, { height } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
;
export default forwardRef((props, ref) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [animationType, setAnimationType] = useState('slide');
    const [modalType, setModalType] = useState('CHANGE');
    const [product, setProduct] = useState({});
    const [cart, setCart] = useState([]);

    const toggle = useCallback((type = 'CHANGE', data = {}) => {
        setProduct(data)
        log('_toggle : ')
        setModalType(type)
        if (type == 'DETAIL') {
            setCart(data)
        }
        setModalVisible(prevState => !prevState);
    }, [modalVisible, modalType, product])

    const _onCloseModal = useCallback(() => {
        setAnimationType('fade')
        setModalVisible(prevState => !prevState);
    }, [modalVisible, animationType]);

    const _onClickPesan = () => {
        props.onChangeBucket({ id: product.id, count: product.count })
        _onCloseModal()
    }
    useImperativeHandle(ref, () => ({
        toggle,
    }));

    const _changeCount = useCallback((type) => {
        log('_changeCount : ', type)
        setProduct(prevState => ({
            ...prevState,
            count: type == 'plus' ? prevState.count + 1 : (prevState.count > 0 ? prevState.count - 1 : 0)
        }))
    }, [product])

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
                                <MyImage source={{ uri: product?.image?.url }} height={150} width={'100%'} resizeMode={'center'} />
                                <MyText left medium black style={{ marginVertical: 6 }}>{product?.name}</MyText>
                                <MyText left black style={{ marginVertical: 6 }}>Rp{product?.price}<MyText strikeThrough>Rp 999.999</MyText></MyText>
                                <MyText left black style={{ marginVertical: 6 }} >{product?.description}</MyText>
                            </ScrollView>
                            <View style={{ width: '100%', height: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: '40%', height: 48, backgroundColor: colors.magnolia, borderRadius: 12, padding: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        disabled={product?.count <= 0}
                                        onPress={() => _changeCount('minus')}
                                        style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: product?.count <= 0 ? colors.lightgray : colors.wildWaterMelon, justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon name={'minus'} color={colors.white} size={15} />
                                    </TouchableOpacity>
                                    <MyText bold medium color={product?.count <= 0 ? colors.lightgray : colors.black}>{product?.count}</MyText>
                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        onPress={() => _changeCount('plus')}
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
                                {cart[0].map(({ count, sumPrice, name }, index) => <View key={`cart-${index}`} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 }}>
                                    <MyText left black >{name} {count > 0 && `x(${count})`}</MyText>
                                    <MyText left black >{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(sumPrice)}</MyText>
                                </View>
                                )}
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 }}>
                                    <MyText left black ><Icon name={'brightness-percent'} color={colors.wildWaterMelon} /> Diskon</MyText>
                                    <MyText left >0</MyText>
                                </View>
                            </ScrollView>
                            <View style={{ height: 2, backgroundColor: colors.athensGray }} />
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 10 }}>
                                <MyText left bold black >Total Pembayaran</MyText>
                                <MyText left bold black >{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(cart[1])}</MyText>
                            </View>
                        </>
                    }
                </ScrollView>
            </View>
        </MyModal>
    )
})