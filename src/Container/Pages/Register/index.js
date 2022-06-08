import { View } from 'react-native'
import React, { useEffect, useCallback } from 'react';
import { MyText, PageWrapper } from '@Atoms';
import { TitleBar, InputItems } from '@Molecules';
import { useTheme } from 'react-native-paper';
import { log } from '@Utils'
export default ({ navigation: { replace, goBack } }) => {
    const { colors } = useTheme();
    const _onRegister = useCallback(() => {
        replace('Home');
    }, [])
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
                <MyText bold large color={colors.black}>Buat akun</MyText>
                <MyText>Untuk membuat akun baru kamu, silahkan isi dengan lengkap form berikut ini.</MyText>
                <InputItems.MyTextInput placeholder={'Nama perusahaan'} />
                <InputItems.MyTextInput placeholder={'Nama kamu'} />
                <InputItems.MyTextInput placeholder={'Kategori Bisnis'} disabled dropdown dropdownPress={() => log('HEHEHEEH')} />
                <InputItems.MyTextInput placeholder={'Email'} />
                <InputItems.MyTextInput placeholder={'No HP'} keyboardType={'phone-pad'} />
                <InputItems.MyTextInput placeholder={'Kata sandi'} secureTextEntry />
                <InputItems.MyRadioInput placeholder={'Jenis Kelamin'}
                    config={{
                        data: [
                            { code: 'L', description: 'Laki-Laki' },
                            { code: 'P', description: 'Perempuan' },
                        ]
                    }} />
                <InputItems.MyButton
                    label={'Daftar'}
                    onPress={_onRegister} />
                <MyText center style={{ marginTop: 25 }}>Sudah punya akun?
                    <MyText bold onPress={goBack}> Masuk</MyText>
                </MyText>
                <View style={{ height: 20 }} />
            </PageWrapper>
        </>
    )
}

