import { View, ScrollView, Modal } from 'react-native';
import React, { useEffect, useState, useCallback, forwardRef, useImperativeHandle, memo } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText, MyModal, PageWrapper } from '@Atoms';
import { Forms } from '@Organisms';
import { INPUT_LIST, FORM_NAME } from './input';
import styles, { height } from './styles';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default memo(forwardRef((props, ref) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [product, setProduct] = useState({});
    const [FORM_INPUT_LIST, SET_FORM_INPUT_LIST] = useState([])
    useImperativeHandle(ref, () => ({
        toggle,
    }));
    const toggle = useCallback(data => {
        log('_toggle : ')
        setProduct(data)
        SET_FORM_INPUT_LIST(INPUT_LIST(data.addons))
        setModalVisible(prevState => !prevState);
    }, [modalVisible, FORM_INPUT_LIST, product])
    const _onCloseModal = useCallback(() => {
        setModalVisible(prevState => !prevState);
    }, [modalVisible]);

    const _submit = useCallback(notes => {
        let tmpProduct = { ...product }
        let selectedNotes = Object.keys(notes).filter(key => key != "Catatan")

        tmpProduct?.addons?.map(addon => {
            if (selectedNotes.includes(addon.name) == true) {
                addon?.list?.map(itemList => {
                    selectedNotes?.map(key => {
                        if (notes[key] == itemList.name) {
                            itemList.available = true;
                        } else {
                            itemList.available = false;
                        }
                    })
                    return itemList;
                })
            }
            return addon
        })
        // log(JSON.stringify(tmpProduct?.addons))
        setProduct({
            ...tmpProduct,
            notes: { ...notes }
        })
        props.onChangeBucket({ id: product.id, notes: { ...notes } })
        setModalVisible(prevState => !prevState);
    }, [product, modalVisible])

    useEffect(() => { return () => { } }, [product])
    return (
        <Modal
            animationType={"slide"}
            transparent
            statusBarTranslucent={false}
            visible={modalVisible}
            onRequestClose={_onCloseModal}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.05)' }}>
                <View style={{ flex: 1 }} />
                <View style={{ paddingHorizontal: '5%', paddingBottom: '5%', paddingTop: '2.5%', backgroundColor: colors.white, marginTop: 10, borderTopStartRadius: 16, borderTopEndRadius: 16 }}>
                    <View style={{ width: 30, height: 4, backgroundColor: colors.athensGray, borderRadius: 10, alignSelf: 'center', marginBottom: 25 }} />
                    <KeyboardAwareScrollView
                        style={{ backgroundColor: 'rgba(0,0,0,.05)' }}
                        contentContainerStyle={{ backgroundColor: colors.white, paddingBottom: 25 }}
                        showsVerticalScrollIndicator={false}>
                        <Forms
                            formname={FORM_NAME}
                            defaultValue={product?.notes || {}}
                            inputList={FORM_INPUT_LIST}
                            onFormSubmit={_submit}
                            submitLabel={'Simpan'}
                        />
                    </KeyboardAwareScrollView>
                </View>
            </View>
        </Modal>
    )
}))