import { View, ScrollView } from 'react-native';
import React, { useEffect, memo, useRef } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { TitleBar, InputItems } from '@Molecules';
import { MyText } from '@Atoms';
import ConfirmModal from './ConfirmModal';
import styles from './styles';
import { ListCustomer, ListOrder } from '@Organisms';

export default memo(({ navigation: { goBack }, route: { params } }) => {
    const { colors } = useTheme();
    const refConfirmModal = useRef(<ConfirmModal />)
    return (
        <View style={styles.container}>
            <TitleBar title={'Konfirmasi Terima'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: colors.white, flex: 1, paddingHorizontal: '5%' }}>
                <ListCustomer {...params} />
                <ListOrder list={[params.items]} />
                <View style={{ marginVertical: 16 }}>
                    <MyText left bold color={colors.black}>Ringkasan Pembayaran</MyText>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30 }}>
                        <MyText center left light color={colors.black}>Total Harga</MyText>
                        <MyText center right bold color={colors.black}>
                            {/* <MyText center right strikeThrough>Rp 224.000</MyText> */}
                            Rp.{params.subTotal}</MyText>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30 }}>
                        <MyText center left light color={colors.black}>PPN</MyText>
                        <MyText center right bold color={params.ppn > 0 ? colors.black : colors.athensGray}>{params.ppn}</MyText>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30 }}>
                        <MyText center left light color={colors.black}>Diskon</MyText>
                        <MyText center right bold color={params.ppn > 0 ? colors.black : colors.athensGray}>{params.discount}</MyText>
                    </View>
                    <View style={{ width: '100%', borderTopColor: colors.athensGray, borderTopWidth: 1, borderStyle: 'dashed', marginVertical: 6 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30 }}>
                        <MyText center left light bold color={colors.black}>Total Pembayaran</MyText>
                        <MyText center right bold color={colors.black}>Rp.{params.subTotal}</MyText>
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