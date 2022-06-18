import { View, ScrollView } from 'react-native';
import React, { useEffect, memo, useRef } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { TitleBar, InputItems } from '@Molecules';
import { MyText } from '@Atoms';
import ConfirmModal from './ConfirmModal';
import styles from './styles';
import { CardCustomer } from '@Organisms';

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
                <CardCustomer />
                <View style={{ padding: 15 }}>
                    <MyText>Accordeon Transaksi</MyText>
                    <MyText left bold>Ringkasan Pembayaran</MyText>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <MyText left >Total Harga</MyText>
                        <MyText right> Rp 199 </MyText>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <MyText left >TPPN</MyText>
                        <MyText right> Rp 199 </MyText>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <MyText left >Total Harga</MyText>
                        <MyText right> Rp 199 </MyText>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <MyText left >FIskon x1</MyText>
                        <MyText right> Rp 199 </MyText>
                    </View>
                    <View style={{ width: '100%', borderTopColor: colors.athensGray, borderTopWidth: 1 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <MyText left >Total Pemayran</MyText>
                        <MyText right> Rp 199 </MyText>
                    </View>
                </View>
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