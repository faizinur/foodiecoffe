import { View, Modal, Image } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import { log } from '@Utils';
import { useTheme, List } from 'react-native-paper';
import { MyText, MySwitch } from '@Atoms';
import { TitleBar } from '@Molecules';
import styles from './styles';
import { IC_PRODUCT_BIG } from '@Atoms/Icons';
export default forwardRef((props, ref) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    useImperativeHandle(ref, () => ({
        toggle,
    }));
    const toggle = useCallback(() => {
        log('_toggle : ')
        setModalVisible(prevState => !prevState);
    }, [])
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
                <TitleBar
                    disabledLeft={true}
                    title={'Edit Menu'} />
                <View style={styles.modalContainer}>
                    <Image source={IC_PRODUCT_BIG} style={{ width: '100%', height: 200 }} />
                    <View style={styles.description}>
                        <MyText left medium bold color={colors.black}>Caramel Macchiato</MyText>
                        <MyText left color={colors.black}>Rp.60.250</MyText>
                        <MyText left light numberOfLines={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames interdum diam. </MyText>
                    </View>
                </View>
            </View>
        </Modal>
    )
})