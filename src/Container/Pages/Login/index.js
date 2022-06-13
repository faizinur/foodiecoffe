import React, { memo, useEffect, useState, useCallback } from 'react'
import { Image } from 'react-native'
import { log } from '@Utils';
import { MyText, PageWrapper } from '@Atoms';
import { Forms } from '@Organisms'
import { useTheme } from 'react-native-paper';
import { IC_HORIZONTAL, ONBOARDINGIMAGE } from '@Atoms/Icons';
import { INPUT_LIST, FORM_NAME } from './input';
import { UseAuth } from '@ViewModel';
export default memo(({ navigation: { navigate, replace } }) => {
    const { _submitLogin } = UseAuth();
    const { colors } = useTheme()

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
            <MyText left bold large color={colors.black} style={{ marginVertical: 6 }}>Selamat Datang!</MyText>
            <MyText left style={{ marginVertical: 6 }}>Selanjutnya, masukkan Nama Pengguna dan Kata sandimu disini ya.</MyText>
            <Forms
                formname={FORM_NAME}
                inputList={INPUT_LIST}
                defaultValue={{
                    "email": "inurfaizi@gmail.com",
                    "password": "foodiecoffee123"
                }}
                onFormSubmit={_submitLogin}
                submitLabel={'masuk'}
            />
            <MyText center style={{ marginVertical: 25 }}>Belum punya akun?
                <MyText bold onPress={_onClickRegister}> Daftar</MyText>
            </MyText>
        </PageWrapper>
    )
})
