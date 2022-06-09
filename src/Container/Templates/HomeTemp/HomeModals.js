import { View, Modal, Image } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, } from 'react';
import { log } from '@Utils';
import { useTheme, } from 'react-native-paper';
import { MyText, } from '@Atoms';
import styles from './styles';
export default forwardRef((props, ref) => {
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
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            statusBarTranslucent={true}
            onRequestClose={_onCloseModal}
            style={styles.modal}>
            <View style={styles.modal}>
                <View style={styles.sectionContainer}>
                    <MyText bold medium color={colors.black} left>Aneka Kuliner</MyText>
                    <MyText left>Yuk cari makanan atau minuman buat hari ini</MyText>
                </View>
            </View>
        </Modal>
    )
})