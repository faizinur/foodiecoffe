import { View, ScrollView, Modal } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, memo } from 'react';
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
    useImperativeHandle(ref, () => ({
        toggle,
    }));
    const toggle = useCallback(() => {
        log('_toggle : ')
        setModalVisible(prevState => !prevState);
    }, [modalVisible])
    const _onCloseModal = useCallback(() => {
        setModalVisible(prevState => !prevState);
    }, [modalVisible]);
    return (
        <Modal
            animationType={"slide"}
            transparent
            statusBarTranslucent={false}
            visible={modalVisible}
            onRequestClose={_onCloseModal}>
            <KeyboardAwareScrollView style={{ backgroundColor: 'rgba(0,0,0,.05)' }} showsVerticalScrollIndicator={false} >
                <View style={{ paddingHorizontal: '5%', paddingBottom: '5%', paddingTop: '2.5%', flex: 1, backgroundColor: colors.white, marginTop: 10, borderTopStartRadius: 16, borderTopEndRadius: 16 }}>
                    <View style={{ width: 30, height: 4, backgroundColor: colors.athensGray, borderRadius: 10, alignSelf: 'center', marginBottom: 25 }} />
                    <Forms
                        formname={FORM_NAME}
                        inputList={INPUT_LIST}
                        onFormSubmit={(data) => log(data)}
                        submitLabel={'Simpan'}
                    />
                </View>
            </KeyboardAwareScrollView>
        </Modal>
    )
}))