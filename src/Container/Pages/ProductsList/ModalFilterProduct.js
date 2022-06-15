import { View, FlatList } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, memo } from 'react';
import { log } from '@Utils';
import { useTheme, } from 'react-native-paper';
import { MyText, MyModal } from '@Atoms';
import { InputItems } from '@Molecules';
import styles from './styles';
export default memo(forwardRef(({ navigation: { navigate } }, ref) => {
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
            <View style={{ flex: .5, width: '100%', backgroundColor: colors.white, padding: '5%', borderTopLeftRadius: 15, borderTopRightRadius: 15, }}>
                <MyText left bold medium color={colors.black}>Filter menu</MyText>
            </View>
            <View style={{ position: 'absolute', width: '100%', bottom: 0, left: 0, justifyContent: 'center', alignItems: 'center', paddingHorizontal: '5%', paddingVertical: 10, borderTopWidth: 1, borderTopColor: colors.athensGray }}>
                <InputItems.MyButton
                    onPress={() => { }}
                    style={[styles.button, { width: '100%' }]}
                    label={'Tampilkan 20 Menu'}
                    labelStyle={{ fontSize: 16 }} />
            </View>
        </MyModal>
    )
}))