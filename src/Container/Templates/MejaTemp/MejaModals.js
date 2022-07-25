import { View, Image } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText, MySwitch, MyModal } from '@Atoms';
import { InputItems } from '@Molecules';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default forwardRef(({ onChange }, ref) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [meja, setMeja] = useState('');
    useImperativeHandle(ref, () => ({
        toggle,
    }));
    const toggle = useCallback((props) => {
        log('_onPressMeja : ', props)
        setMeja(props)
        setModalVisible(prevState => !prevState);
    }, [modalVisible, meja])
    const _onPerbaharuiPress = useCallback(() => {
        log('_onPerbaharuiPress  :')
        setModalVisible(prevState => !prevState);
    }, [modalVisible]);
    const _onCloseModal = useCallback(() => {
        setModalVisible(prevState => !prevState);
    }, [modalVisible]);
    const FloatingQRMarker = useCallback(() => (<View style={styles.qrWrapper}>
        <View style={styles.qrMarker}>
            <Image source={meja.qr} style={{ height: '100%', width: '100%' }} />
        </View>
        <View style={styles.qrMarkerTopRight} />
        <View style={styles.qrMarkerTopLeft} />
        <View style={styles.qrMarkerBottomRight} />
        <View style={styles.qrMarkerBottomLeft} />
    </View>), [meja]);
    const _updateOccupied = useCallback(occupied => {
        setMeja(prevState => ({ ...prevState, occupied }));
        onChange({ ...meja, occupied })
    }, [meja]);
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
                <MyText bold color={meja?.occupied ? colors.black : colors.lightgray}>{meja?.number}</MyText>
            </View>
            <FloatingQRMarker />
            <View style={styles.cardSummary}>
                <MyText left medium bold black style={{ marginBottom: 15 }}>Ringkasan Belanja</MyText>
                <View style={styles.sectionList}>
                    <MyText light black>Jumlah Orang</MyText>
                    <MyText bold light black>{meja?.seat} Orang</MyText>
                </View>
                <View style={styles.sectionList}>
                    <MyText light black>Lokasi </MyText>
                    <MyText bold light black>Lantai {meja?.floor}</MyText>
                </View>
                <View style={styles.dashed} />
                <View style={styles.sectionList}>
                    <MyText light>Status :: <MyText bold color={meja?.occupied ? colors.emerald : colors.black}>
                        {meja?.occupied ? 'Terisi' : 'Ditempati'} </MyText>::
                    </MyText>
                    <MySwitch color={colors.emerald} value={meja?.occupied} onChange={_updateOccupied} />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <InputItems.MyButton label={'Perbaharui'} onPress={_onPerbaharuiPress} />
            </View>
        </MyModal>
    )
})

