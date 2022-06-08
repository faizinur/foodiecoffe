import { View, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TitleBar, InputItems } from '@Molecules'
import { IC_DEFAULT_PROFILE } from '@Atoms/Icons';
export default memo(props => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const _editProfile = useCallback(() => {
        log('_editProfile : ')
        setModalVisible(prevState => !prevState);
    }, [modalVisible])
    return (
        <>
            <View style={{ width: '100%', height: 103, backgroundColor: colors.wildWatermelon, paddingHorizontal: '5%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: 80, height: 80, alignSelf: 'flex-start' }}>
                    <Image source={IC_DEFAULT_PROFILE} style={{ borderRadius: 30, height: 60, width: 60, marginRight: 12 }} />
                </View>
                <View style={{ flex: 1, height: '100%' }}>
                    <MyText left medium bold color={colors.black}>Riza Sulaemans</MyText>
                    <MyText left light>riza_sulamemans@gmail.com</MyText>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={{ height: 26, width: 50, backgroundColor: colors.cerulean, justifyContent: 'center', alignItems: 'center', borderRadius: 6 }}>
                            <MyText center bold light color={colors.white}>Kasir</MyText>
                        </View>
                        <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: colors.lightningYellow, marginHorizontal: 12 }} />
                        <MyText center light bold color={colors.black}>4.8/5</MyText>
                    </View>
                </View>
                <TouchableOpacity
                    style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 15, alignSelf: 'flex-start' }}
                    activeOpacity={.7}
                    onPress={_editProfile}>
                    <Icon name={'pencil-outline'} size={20} color={colors.cerulean} style={{ marginHorizontal: 5 }} />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(prevState => !prevState);
                }}
                style={{ backgroundColor: colors.white, flex: 1 }}
            >
                <TitleBar title={'Ubah Profil'}
                    customLeftPress={() => setModalVisible(prevState => !prevState)}
                />
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: 200, alignSelf: 'center' }}>
                        <TouchableOpacity
                            activeOpacity={.8}
                            style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={IC_DEFAULT_PROFILE} resizeMode={'stretch'} style={{ borderRadius: 40, height: 80, width: 80 }} />
                            <View style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: colors.cerulean, borderWidth: 1, borderColor: colors.white, position: 'absolute', top: 13, right: 0, justifyContent: 'center', alignItems: 'center' }} >
                                <Icon name={'camera'} size={18} color={colors.white} />
                            </View>
                        </TouchableOpacity>
                        <MyText center style={{ textAlign: 'center' }}>Yuk pasang foto barumu, pasang foto {'\n'}yang menarik oke!</MyText>
                    </View>
                    <View style={{ paddingHorizontal: '5%' }}>
                        <InputItems.MyTextInput placeholder={'Nama Depan'} />
                        <InputItems.MyTextInput placeholder={'Nama Belakang'} />
                        <InputItems.MyTextInput placeholder={'Email'} />
                        <InputItems.MyTextInput placeholder={'No HP'} keyboardType={'phone-pad'} />
                        <InputItems.MyTextInput placeholder={'Kata sandi'} secureTextEntry />
                        <InputItems.MyTextInput placeholder={'Nama kamu'} />
                        <InputItems.MyRadioInput placeholder={'Jenis Kelamin'}
                            config={{
                                data: [
                                    { code: 'L', description: 'Laki-Laki' },
                                    { code: 'P', description: 'Perempuan' },
                                ]
                            }} />
                    </View>
                </ScrollView>
                <View style={{ width: '100%', height: 80, paddingHorizontal: '5%', justifyContent: 'center', }}>
                    <InputItems.MyButton
                        label={'Simpan'}
                        onPress={() => {
                            setModalVisible(prevState => !prevState);
                            log('Simpan update Data : ')
                        }}
                    />
                </View>
            </Modal>
        </>
    )
})
