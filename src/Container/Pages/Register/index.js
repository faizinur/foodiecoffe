import React, { useEffect, useCallback } from 'react';
import { MyText, PageWrapper } from '@Atoms';
import { TitleBar, InputItems } from '@Molecules';
import { useTheme } from 'react-native-paper';
import { View } from 'react-native';
import { Forms } from '@Organisms';
import { INPUT_LIST, FORM_NAME } from './input';
import { log } from '@Utils'
import { UseAuth } from '@ViewModel';
export default ({ navigation: { replace, goBack } }) => {
    const { _submitRegister } = UseAuth();
    const { colors } = useTheme();
    useEffect(() => {
        log('Mount Register');
        return () => {
            log('Unmount Register')
        }
    }, [])
    return (
        <>
            <TitleBar />
            <PageWrapper>
                <MyText left bold large black>Buat akun</MyText>
                <MyText left>Untuk membuat akun baru kamu, silahkan isi dengan lengkap form berikut ini.</MyText>
                <Forms
                    formname={FORM_NAME}
                    inputList={INPUT_LIST}
                    onFormSubmit={_submitRegister}
                    submitLabel={'Register'}
                />
                <MyText center style={{ marginTop: 25 }}>Sudah punya akun?
                    <MyText bold onPress={goBack}> Masuk</MyText>
                </MyText>
                <View style={{ height: 20 }} />
            </PageWrapper>
        </>
    )
}

