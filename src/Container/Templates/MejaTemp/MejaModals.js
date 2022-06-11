import { View } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import { log } from '@Utils';
import { useTheme, List } from 'react-native-paper';
import { MyText, MySwitch, MyModal, MyCamera } from '@Atoms';
import { InputItems } from '@Molecules';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default forwardRef((props, ref) => {
    const { colors } = useTheme();
    const [isSwitch, setIsSwitch] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [meja, setMeja] = useState({});
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
    const FloatingQRMarker = () => (<View style={styles.qrWrapper}>
        <View style={styles.qrMarker}>
            <Icon name={'qrcode'} size={180} color={'rgba(0,0,0,.15)'} />
        </View>
        <View style={styles.qrMarkerTopRight} />
        <View style={styles.qrMarkerTopLeft} />
        <View style={styles.qrMarkerBottomRight} />
        <View style={styles.qrMarkerBottomLeft} />
    </View>)
    return (
        <MyModal
            visible={modalVisible}
            onRequestClose={_onCloseModal}
            statusBarTranslucent={true}
            contentContainerStyle={styles.contentContainerStyle}>
            <MyCamera onGoogleVisionBarcodesDetected={_onGoogleVisionBarcodesDetected}>
                <View style={styles.badgeMeja}>
                    <View style={styles.badgeIcon}>
                        <Icon name={'desktop-tower-monitor'} size={20} color={colors.cerulean} />
                    </View>
                    <MyText bold color={isSwitch ? colors.black : colors.lightgray}>04</MyText>
                </View>
                <FloatingQRMarker />
                <View style={[styles.cardSummary, { flexDirection: 'row' }]}>
                    <View style={styles.orderDetailContainer}>
                        <Icon name={'account-group'} size={20} color={isSwitch ? colors.cerulean : colors.lightgray} />
                        <MyText bold light color={isSwitch ? colors.black : colors.lightgray}>5 Orang</MyText>
                    </View>
                    <View style={styles.orderDetailContainer}>
                        <Icon name={'map-marker'} size={20} color={isSwitch ? colors.cerulean : colors.lightgray} />
                        <MyText bold light color={isSwitch ? colors.black : colors.lightgray}>Lantai 2</MyText>
                    </View>
                    <View style={styles.orderDetailContainer}>
                        <MyText light bold color={isSwitch ? colors.emerald : colors.lightgray}>{isSwitch ? 'Terisi' : 'Ditempati'} </MyText>
                        <MySwitch color={colors.emerald} value={isSwitch} onValueChange={setIsSwitch} />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <InputItems.MyButton label={'Perbaharui'} onPress={_onPerbaharuiPress} />
                </View>
            </MyCamera>
        </MyModal>
    )
})

{/* <View style={styles.cardSummary}>
                <List.Accordion
                    titleStyle={{ color: colors.black }}
                    style={styles.accordion}
                    title="Ringkasan Belanja"
                    expanded={expanded}
                    onPress={() => setExpanded(prevState => !prevState)}
                    theme={{
                        colors: {
                            background: colors.white,
                            backdrop: colors.white,
                            surface: colors.white,
                        }
                    }}> 
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
            </View> */}