import { View, ScrollView, BackHandler, Alert } from 'react-native';
import React, { useEffect, memo, useRef } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { TitleBar, InputItems } from '@Molecules';
import { MyText } from '@Atoms';
import DetailOrderModal from './DetailOrderModal';
import styles from './styles';
import { ListCustomer, ListOrder } from '@Organisms';
import { UseMerchant } from '@ViewModel';

export default memo(({ navigation: { goBack }, route: { params } }) => {
    const { colors } = useTheme();
    const refDetailOrderModal = useRef(<DetailOrderModal />)
    const { _getDetailMerchantOrder, orderDetail, _onConfirm, _acceptAction, _rejectAction, _onOrderChangeName } = UseMerchant(params);
    const backAction = () => {
        if (orderDetail?.status == 'process') {
            refDetailOrderModal?.current?.reject()
            return true;
        } else {
            goBack()
            return true;
        }
    }

    useEffect(() => {
        log('Mount DetailOrder');
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        _getDetailMerchantOrder()
        return () => {
            log('Unmount DetailOrder')
            backHandler.remove();
        }
    }, [])
    return (
        <View style={styles.container}>
            <TitleBar title={params?.title || 'title'}
                customLeftPress={backAction}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: colors.white, flex: 1, paddingHorizontal: '5%' }}>
                <ListCustomer {...orderDetail} onTextBlur={_onOrderChangeName} />
                <ListOrder orders={orderDetail?.items || []} />
                <View style={{ marginVertical: 16 }}>
                    <MyText left bold black>Ringkasan Pembayaran</MyText>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30 }}>
                        <MyText center left light black>Total Harga</MyText>
                        <MyText center right bold black>
                            Rp.{orderDetail?.subTotal}</MyText>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30 }}>
                        <MyText center left light black>PPN</MyText>
                        <MyText center right bold color={orderDetail?.ppn > 0 ? colors.black : colors.athensGray}>{orderDetail?.ppn}</MyText>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30 }}>
                        <MyText center left light black>Diskon</MyText>
                        <MyText center right bold color={orderDetail.ppn > 0 ? colors.black : colors.athensGray}>{orderDetail?.discount}</MyText>
                    </View>
                    <View style={{ width: '100%', borderTopColor: colors.athensGray, borderTopWidth: 1, borderStyle: 'dashed', marginVertical: 6 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30 }}>
                        <MyText center left light bold black>Total Pembayaran</MyText>
                        <MyText center right bold black>Rp.{orderDetail?.subTotal}</MyText>
                    </View>
                </View>
            </ScrollView>
            {!['success', 'failed', 'refund'].includes(orderDetail?.status) &&
                < View style={{ height: 80, backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.athensGray, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingHorizontal: '5%' }}>
                    <InputItems.MyButton
                        secondary
                        onPress={refDetailOrderModal?.current?.reject}
                        style={{ flexGrow: 1, marginRight: 3 }}
                        label={orderDetail?.status == 'process' ? 'batal' : 'Tolak'} />
                    <InputItems.MyButton
                        onPress={refDetailOrderModal?.current?.accept}
                        style={{ flexGrow: 1, marginLeft: 3 }}
                        label={orderDetail?.status == 'process' ? 'pesan' : 'Terima'} />
                </View>
            }
            <DetailOrderModal ref={refDetailOrderModal} acceptAction={_acceptAction} rejectAction={_rejectAction} onConfirm={_onConfirm} />
        </View >
    )
})