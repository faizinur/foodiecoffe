import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, } from 'react';
import { log } from '@Utils';
import { useTheme, } from 'react-native-paper';
import { MyText, MyModal } from '@Atoms';
import { TitleBar, InputItems } from '@Molecules';
import { CardCategory } from '@Organisms';
import { IC_DEFAULT_PROFILE } from '@Atoms/Icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
    const _onPressAvatar = useCallback(() => {
        log('_onPressAvatar')
    }, [])
    return (
        <MyModal
            visible={modalVisible}
            onRequestClose={_onCloseModal}
            contentContainerStyle={styles.contentContainerStyle}>
            <TitleBar title={'Ubah Profil'} customLeftPress={_onCloseModal} />
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.container}>
                <View style={styles.avatarSection}>
                    <TouchableOpacity
                        onPress={_onPressAvatar}
                        activeOpacity={.8}
                        style={styles.avatarProfile}>
                        <Image source={IC_DEFAULT_PROFILE} resizeMode={'stretch'} style={styles.avatarImg} />
                        <View style={styles.avatarIcon}>
                            <Icon name={'camera'} size={18} color={colors.white} />
                        </View>
                    </TouchableOpacity>
                    <MyText center style={styles.decriptionText}>Yuk pasang foto barumu, pasang foto {'\n'}yang menarik oke!</MyText>
                </View>
                <MyText center color={colors.valencia} bold fontSize={22}>INPUT ITEM BELUM FORMS</MyText>
                <InputItems.MyTextInput placeholder={'Nama Depan'} />
                <InputItems.MyTextInput placeholder={'Nama Belakang'} />
                <InputItems.MyTextInput placeholder={'Email'} />
                <InputItems.MyTextInput placeholder={'No HP'} keyboardType={'phone-pad'} />
                <InputItems.MyTextInput placeholder={'Kata sandi'} secureTextEntry />
                <InputItems.MyTextInput placeholder={'Nama kamu'} />
                <InputItems.MyRadioInput placeholder={'Jenis Kelamin'}
                    data={[
                        { code: 'L', description: 'Laki-Laki' },
                        { code: 'P', description: 'Perempuan' }
                    ]} />
            </ScrollView>
            <View style={styles.buttonContainer}>
                <InputItems.MyButton
                    label={'Simpan'}
                    onPress={_onCloseModal}
                />
            </View>
        </MyModal>
    )
})