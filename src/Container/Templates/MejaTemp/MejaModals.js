import { View, Image } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import { log } from '@Utils';
import { useTheme, List } from 'react-native-paper';
import { MyText, MySwitch, MyModal } from '@Atoms';
import { InputItems } from '@Molecules';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default forwardRef((props, ref) => {
    const { colors } = useTheme();
    const [isSwitch, setIsSwitch] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [QR_IMG, setQR_IMG] = useState('');
    useImperativeHandle(ref, () => ({
        toggle,
    }));
    const toggle = useCallback((qr) => {
        log('_onPressMeja : ')
        setQR_IMG(qr)
        setModalVisible(prevState => !prevState);
    }, [modalVisible, QR_IMG])
    const _onPerbaharuiPress = useCallback(() => {
        log('_onPerbaharuiPress  :')
    }, []);
    const _onCloseModal = useCallback(() => {
        setModalVisible(prevState => !prevState);
    }, [modalVisible]);
    const _onGoogleVisionBarcodesDetected = useCallback(({ barcodes }) => {
        if (barcodes.length > 0) {
            log('barcodes : ', barcodes);
        }
    }, [])
    const FloatingQRMarker = useCallback(() => (<View style={styles.qrWrapper}>
        <View style={styles.qrMarker}>
            {/* <Icon name={'qrcode'} size={180} color={'rgba(0,0,0,.15)'} /> */}
            <Image source={{ uri: QR_IMG }} style={{ height: 30, width: 30 }} />
        </View>
        <View style={styles.qrMarkerTopRight} />
        <View style={styles.qrMarkerTopLeft} />
        <View style={styles.qrMarkerBottomRight} />
        <View style={styles.qrMarkerBottomLeft} />
    </View>), [QR_IMG])
    return (
        <MyModal
            animationType={'fade'}
            visible={modalVisible}
            onRequestClose={_onCloseModal}
            statusBarTranslucent={true}
            contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.drawerIndicator} />
            <View style={styles.badgeMeja}>
                <View style={styles.badgeIcon}>
                    <Icon name={'desktop-tower-monitor'} size={20} color={colors.cerulean} />
                </View>
                <MyText bold color={isSwitch ? colors.black : colors.lightgray}>04</MyText>
            </View>
            <FloatingQRMarker />
            <View style={styles.cardSummary}>
                <MyText left medium bold color={colors.black} style={{ marginBottom: 15 }}>Ringkasan Belanja</MyText>
                <View style={styles.sectionList}>
                    <MyText light color={colors.black}>Jumlah Orang</MyText>
                    <MyText bold light color={colors.black}>5 Orang</MyText>
                </View>
                <View style={styles.sectionList}>
                    <MyText light color={colors.black}>Lokasi </MyText>
                    <MyText bold light color={colors.black}>Lantai 2</MyText>
                </View>
                <View style={styles.dashed} />
                <View style={styles.sectionList}>
                    <MyText light>Status :: <MyText bold color={isSwitch ? colors.emerald : colors.black}>
                        {isSwitch ? 'Terisi' : 'Ditempati'} </MyText>::
                    </MyText>
                    <MySwitch color={colors.emerald} value={isSwitch} onValueChange={setIsSwitch} />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <InputItems.MyButton label={'Perbaharui'} onPress={_onPerbaharuiPress} />
            </View>
        </MyModal>
    )
})

