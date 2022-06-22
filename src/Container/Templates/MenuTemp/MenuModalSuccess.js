import { View, ScrollView, Image } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, memo } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyModal, MyText } from '@Atoms';
import { InputItems } from '@Molecules';
import { IC_MODAL_SUCCESS } from '@Atoms/Icons'
import styles, { height } from './styles';
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
        <MyModal
            visible={modalVisible}
            onRequestClose={_onCloseModal}
            statusBarTranslucent={true}
            contentContainerStyle={styles.filterContainerStyle}>
            <View style={{ width: '100%', position: 'absolute', bottom: 0, left: 0, backgroundColor: colors.white, paddingHorizontal: '5%', paddingTop: '5%', borderTopLeftRadius: 15, borderTopRightRadius: 15, }}>
                <ScrollView
                    style={{ maxHeight: height * .755, minHeight: 180 }}
                    showsVerticalScrollIndicator={false}>
                    <Image source={IC_MODAL_SUCCESS} style={{ width: '100%', borderRadius: 25, marginBottom: 25 }} />
                    <MyText center large bold black>Perubahan Disimpan</MyText>
                    <MyText center style={{ marginVertical: 6 }}>Selamat, perbahan menu berhasil disimpan</MyText>
                </ScrollView>
                <View style={{ width: '100%', height: 85, alignItems: 'center', backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.athensGray }}>
                    <InputItems.MyButton
                        onPress={_onCloseModal}
                        style={[styles.button, { width: '100%', marginVertical: 15 }]}
                        label={'Oke, Sip'}
                        labelStyle={{ fontSize: 16 }} />
                </View>
            </View>
        </MyModal>
    )
}))