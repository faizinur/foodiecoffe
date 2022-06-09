import { View, Modal } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import { log } from '@Utils';
import { useTheme, List } from 'react-native-paper';
import { MyText, MySwitch } from '@Atoms';
import { InputItems } from '@Molecules';
import styles, { height } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/core';
import { RNCamera } from 'react-native-camera';
export default forwardRef((props, ref) => {
    const isFocused = useIsFocused();
    const { colors } = useTheme();
    const [expanded, setExpanded] = useState(true);
    const [isSwitch, setIsSwitch] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [meja, setMeja] = useState({});
    const refCamera = useRef(null);
    useImperativeHandle(ref, () => ({
        toggle,
    }));
    const toggle = useCallback((meja) => {
        log('_onPressMeja : ')
        setMeja(meja)
        setModalVisible(prevState => !prevState);
    }, [modalVisible, meja])
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
    const PendingView = () => (<MyText>CAMERA ERROR</MyText>)
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            statusBarTranslucent={true}
            onRequestClose={_onCloseModal}
            style={styles.modal}>
            <View style={styles.modal}>
                <View style={styles.modalContainer}>
                    <RNCamera
                        ref={refCamera}
                        style={styles.rnCamera}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.on}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: 'Permission to use audio recording',
                            message: 'We need your permission to use your audio',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        onGoogleVisionBarcodesDetected={_onGoogleVisionBarcodesDetected}
                    >
                        {({ camera, status, recordAudioPermissionStatus }) =>
                            status !== 'READY' && <PendingView /> ||
                            <>
                                <View style={styles.drawwerIndicator} />
                                <View style={styles.badgeMeja}>
                                    <View style={styles.badgeIcon}>
                                        <Icon name={'desktop-tower-monitor'} size={20} color={colors.cerulean} />
                                    </View>
                                    <MyText bold color={colors.black}>04</MyText>
                                </View>
                                <View style={styles.qrWrapper}>
                                    <View style={styles.qrMarker}>
                                        <Icon name={'qrcode'} size={180} color={colors.black} />
                                    </View>
                                    <View style={styles.qrMarkerTopRight} />
                                    <View style={styles.qrMarkerTopLeft} />
                                    <View style={styles.qrMarkerBottomRight} />
                                    <View style={styles.qrMarkerBottomLeft} />
                                </View>
                                <View style={styles.cardSummary}>
                                    <List.Accordion
                                        titleStyle={{ color: colors.black }}
                                        style={styles.accordion}
                                        title="Ringkasan Belanja"
                                        expanded={expanded}
                                        onPress={() => setExpanded(prevState => !prevState)}>
                                        <View style={styles.accordionWrapper}>
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
                                    </List.Accordion>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <InputItems.MyButton label={'Perbaharui'} onPress={_onPerbaharuiPress} />
                                </View>
                            </>
                        }
                    </RNCamera>
                </View>
            </View>
        </Modal>
    )
})