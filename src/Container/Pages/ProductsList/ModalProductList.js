import { View, ScrollView, FlatList } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, memo } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText, MyModal } from '@Atoms';
import { InputItems } from '@Molecules';
import { Forms } from '@Organisms';
import { INPUT_LIST, FORM_NAME } from './input';
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
            <View style={{ width: '100%', position: 'absolute', bottom: 0, left: 0, backgroundColor: colors.white, paddingHorizontal: '5%', paddingTop: '2%', borderTopLeftRadius: 15, borderTopRightRadius: 15, }}>
                <View style={{ height: 4, width: 30, backgroundColor: colors.athensGray, borderRadius: 10, alignSelf: 'center', marginBottom: '3%' }} />
                <ScrollView
                    style={{ height: height * .87 }}
                    showsVerticalScrollIndicator={false}>
                    <MyText left bold medium black style={{ marginBottom: 24 }}>Kastem Pesanan</MyText>
                    <Forms
                        formname={FORM_NAME}
                        inputList={INPUT_LIST}
                        onFormSubmit={(data) => log(data)}
                        submitLabel={'Register'}
                        renderButton={submitfn =>
                            <View style={{ width: '100%', height: 85, alignItems: 'center', backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.athensGray }}>
                                <InputItems.MyButton
                                    onPress={submitfn}
                                    style={[styles.button, { width: '100%', marginVertical: 15 }]}
                                    label={'Simpan'}
                                    labelStyle={{ fontSize: 16 }} />
                            </View>
                        }
                    />
                </ScrollView>

            </View>
        </MyModal>
    )
}))