import React, { memo, useEffect, useRef, useCallback } from 'react'
import { Image } from 'react-native'
import { log } from '@Utils';
import { MyText, PageWrapper } from '@Atoms';
import { Forms } from '@Organisms'
import { useTheme } from 'react-native-paper';
import { IC_HORIZONTAL, ONBOARDINGIMAGE } from '@Atoms/Icons';
import { INPUT_LIST, FORM_NAME } from './input';
import { UseAuth } from '@ViewModel';
export default memo(({ navigation: { navigate } }) => {
    const { _submitLogin, loading, authError } = UseAuth();
    const { colors } = useTheme()
    const refForms = useRef(<Forms />)

    const defaultValue = {
        email: "inurfaizi@gmail.com",
        password: "foodiecoffee123",
    }
    const _onClickRegister = useCallback(() => {
        navigate('Register');
    }, []);

    useEffect(() => {
        log('Mount Login');
        if (authError != '') {
            refForms.current?.setErrorField('email', { type: 'focus', message: 'Email Belum Benar' }, { shouldFocus: true })
            refForms.current?.setErrorField('password', { type: 'focus', message: 'Password Belum Benar' }, { shouldFocus: false })
        }
        return () => {
            log('Unmount Login')
        }
    }, [authError])
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
            <MyText left bold large black style={{ marginVertical: 6 }}>Selamat Datang!</MyText>
            <MyText left style={{ marginVertical: 6 }}>Selanjutnya, masukkan Nama Pengguna dan Kata sandimu disini ya.</MyText>
            <Forms
                ref={refForms}
                formname={FORM_NAME}
                inputList={INPUT_LIST}
                defaultValue={__DEV__ ? defaultValue : {}}
                onFormSubmit={_submitLogin}
                submitLabel={'masuk'}
                loading={loading}
            />
            <MyText center style={{ marginVertical: 25 }}>Belum punya akun?
                <MyText bold onPress={_onClickRegister}> Daftar</MyText>
            </MyText>
        </PageWrapper>
    )
})
