import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, useEffect } from 'react';
import { log, CONSTANT } from '@Utils';
import { MyImage } from '@Atoms';
import { useTheme, } from 'react-native-paper';
import { MyText, MyModal } from '@Atoms';
import { TitleBar, } from '@Molecules';
import { INPUT_LIST, FORM_NAME } from './input';
import { Forms } from '@Organisms';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';


export default forwardRef(({ submitProfile, userData }, ref) => {
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
                        <MyImage source={{ uri: userData?.image?.url || null }} width={80} height={80} radius={[40, 40, 40, 40]} />
                        <View style={styles.avatarIcon}>
                            <Icon name={'camera'} size={18} color={colors.white} />
                        </View>
                    </TouchableOpacity>
                    <MyText center style={styles.decriptionText}>Yuk pasang foto barumu, pasang foto {'\n'}yang menarik oke!</MyText>
                </View>
                <Forms
                    formname={FORM_NAME}
                    defaultValue={{
                        username: userData?.username,
                        email: userData?.email,
                        password: userData?.passowrd,
                    }}
                    inputList={INPUT_LIST}
                    onFormSubmit={submitProfile}
                    submitLabel={'Simpan'}
                />
            </ScrollView>
        </MyModal>
    )
})