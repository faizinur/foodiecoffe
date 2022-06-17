import { View, ScrollView } from 'react-native';
import React, { useEffect, memo, useRef } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { TitleBar, InputItems } from '@Molecules';
import { MyText } from '@Atoms';
import ConfirmModal from './ConfirmModal';
import styles from './styles';

export default memo(({ navigation: { goBack }, route: { params } }) => {
    const { colors } = useTheme();
    const refConfirmModal = useRef(<ConfirmModal />)
    useEffect(() => {
        log('Mount ConfirmOrder');
        return () => {
            log('Unmount ConfirmOrder')
        }
    }, [])
    return (
        <View style={styles.container}>
            <TitleBar title={'Konfirmasi Terima'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: colors.white, flex: 1 }}>
                <MyText>CardCustomer</MyText>
                <MyText>Accordeon Transaksi</MyText>
                <MyText>Ringkasan Pembayaran</MyText>
            </ScrollView>
            <View style={{ height: 80, backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.athensGray, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingHorizontal: '5%' }}>
                <InputItems.MyButton
                    secondary
                    onPress={() => refConfirmModal?.current?.toggle('reject')}
                    style={{ flexGrow: 1, marginRight: 3 }}
                    label={'Tolak'} />
                <InputItems.MyButton
                    onPress={() => refConfirmModal?.current?.toggle('accept')}
                    style={{ flexGrow: 1, marginLeft: 3 }}
                    label={'Terima'} />
            </View>
            <ConfirmModal ref={refConfirmModal} onConfirm={goBack} />
        </View>
    )
})