import { View, ScrollView } from 'react-native';
import React, { useEffect, memo, useRef } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { TitleBar, InputItems } from '@Molecules';
import { MyText } from '@Atoms';
import DetailOrderModal from './DetailOrderModal';
import styles from './styles';
import { ListCustomer, ListOrder } from '@Organisms';

export default memo(({ navigation: { goBack }, route: { params } }) => {
    const { colors } = useTheme();
    const refDetailOrderModal = useRef(<DetailOrderModal />)
    useEffect(() => {
        log('Mount DetailOrder');
        switch (params?.order?.status) {
            case "success":
                log('ambil ke model transaksi/getDaftarTransaksi');
                break;
            case "incoming":
                log('ambil ke model order/getOrders');
                break;
            case "new":
                log('ambil ke db order');
                break;
        }
        return () => {
            log('Unmount DetailOrder')
        }
    }, [])
    return (
        <View style={styles.container}>
            <TitleBar title={params?.title || 'title'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: colors.white, flex: 1, paddingHorizontal: '5%' }}>
                <ListCustomer {...params?.order} />
                <ListOrder orders={params?.order?.items} />
                <View style={{ marginVertical: 16 }}>
                    <MyText left bold black>Ringkasan Pembayaran</MyText>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30 }}>
                        <MyText center left light black>Total Harga</MyText>
                        <MyText center right bold black>
                            {/* <MyText center right strikeThrough>Rp 224.000</MyText> */}
                            Rp.{params?.order?.subTotal}</MyText>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30 }}>
                        <MyText center left light black>PPN</MyText>
                        <MyText center right bold color={params?.order?.ppn > 0 ? colors.black : colors.athensGray}>{params?.order?.ppn}</MyText>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30 }}>
                        <MyText center left light black>Diskon</MyText>
                        <MyText center right bold color={params?.order?.ppn > 0 ? colors.black : colors.athensGray}>{params?.order?.discount}</MyText>
                    </View>
                    <View style={{ width: '100%', borderTopColor: colors.athensGray, borderTopWidth: 1, borderStyle: 'dashed', marginVertical: 6 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30 }}>
                        <MyText center left light bold black>Total Pembayaran</MyText>
                        <MyText center right bold black>Rp.{params?.order?.subTotal}</MyText>
                    </View>
                </View>
            </ScrollView>
            {!['success', 'process', 'failed', 'refund'].includes(params?.order?.status) &&
                < View style={{ height: 80, backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.athensGray, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingHorizontal: '5%' }}>
                    <InputItems.MyButton
                        secondary
                        onPress={() => refDetailOrderModal?.current?.toggle('reject')}
                        style={{ flexGrow: 1, marginRight: 3 }}
                        label={'Tolak'} />
                    <InputItems.MyButton
                        onPress={() => refDetailOrderModal?.current?.toggle('accept')}
                        style={{ flexGrow: 1, marginLeft: 3 }}
                        label={'Terima'} />
                </View>
            }
            <DetailOrderModal ref={refDetailOrderModal} onConfirm={goBack} />
        </View >
    )
})