import { View, Text } from 'react-native'
import React, { memo, useEffect, useCallback } from 'react'
import { Image } from 'react-native'
import { useSelector } from 'react-redux'
import { log } from '@Utils';
import { MyText, PageWrapper } from '@Atoms';
import { InputItems } from '@Molecules';
import { useTheme } from 'react-native-paper';
import { IC_HORIZONTAL, ONBOARDINGIMAGE } from '@Atoms/Icons';
export default memo(({ navigation: { navigate, replace } }) => {
    const { colors } = useTheme()
    //selector 
    const userData = useSelector(({ userReducers }) => userReducers);

    const _onLogin = useCallback(() => {
        replace('Home')
    }, [])
    const _onClickRegister = useCallback(() => {
        navigate('Register');
    }, [])
    useEffect(() => {
        log('Mount Login');
        return () => {
            log('Unmount Login')
        }
    }, [])
    return (
        <PageWrapper>
            <Image
                source={ONBOARDINGIMAGE}
                resizeMode={'stretch'}
                style={{ width: '100%', marginVertical: 6.5 }}
            />
            <Image
                source={IC_HORIZONTAL}
                resizeMode={'stretch'}
                style={{ marginVertical: 6.5 }}
            />
            <MyText bold large color={colors.black} style={{ marginVertical: 6 }}>Selamat Datang!</MyText>
            <MyText style={{ marginVertical: 6 }}>Selanjutnya, masukkan Nama Pengguna dan Kata sandimu disini ya.</MyText>
            <InputItems.MyTextInput
                placeholder={'Username'} />
            <InputItems.MyTextInput
                placeholder={'Password'}
                secureTextEntry />
            <InputItems.MyButton
                label={'masuk'}
                onPress={_onLogin} />
            <MyText center style={{ marginTop: 25 }}>Belum punya akun?
                <MyText bold onPress={_onClickRegister}> Daftar</MyText>
            </MyText>
        </PageWrapper>
    )
})
