import { View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, memo, useRef, useCallback } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { TitleBar, ExitBar } from '@Molecules';
import { MyText } from '@Atoms';
import { CardProfile, CardPendapatan, CardTraffic } from '@Organisms';
import AkunModals from './AkunModals';
import { ListTransaksi, ListTraffic } from '@Data';
import { UseAuth } from '@ViewModel';
import styles from './styles';
import { useSelector } from 'react-redux';
export default memo(() => {
    const { _saveProfile, _logOut, _loadProfile, profile } = UseAuth();
    const { colors } = useTheme();
    const refAkunModals = useRef(<AkunModals />)
    const _onEditProfilePress = useCallback(() => {
        log('_editProfile : ')
        refAkunModals.current?.toggle()
    }, [])
    const _onDetailTransactionPress = useCallback(() => {
        log('_onDetailTransactionPress  : ')
    }, [])
    const _renderCardPendapatan = ({ item, index }) => <CardPendapatan {...item} index={index} />
    const _renderCardTraffic = ({ item, index }) => <CardTraffic {...item} index={index} />
    const userData = useSelector(state => state.userReducers.user);

    useEffect(() => {
        log('Mount Akun');
        _loadProfile();
        return () => {
            log('Unmount Akun')
        }
    }, [])
    return (
        <View style={styles.pages}>
            <TitleBar title={'profil'} />
            <View style={styles.akunContainer}>
                <MyText>profile : {JSON.stringify(profile)}</MyText>
                <CardProfile onEditProfilePress={_onEditProfilePress} userData={userData} />

                <View style={styles.cardTansaksiWrapper}>
                    <View style={styles.titleSection}>
                        <MyText bold black>Transaksi</MyText>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={_onDetailTransactionPress}>
                            <MyText center color={colors.cerulean}>Lihat semua</MyText>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        horizontal
                        style={styles.flatListTransaksi}
                        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                        data={ListTransaksi}
                        renderItem={_renderCardPendapatan}
                        snapToInterval={200}
                        keyExtractor={({ id }) => id}
                        ListEmptyComponent={<MyText light bold black style={{ marginHorizontal: '5%' }}>Oops, Pendapatan kosong nih...!</MyText>}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                    />
                </View>

                <View style={styles.listTrafficWrapper}>
                    <View style={styles.trafficTitle}>
                        <MyText bold left black>Traffic Hari Ini</MyText>
                    </View>
                    <FlatList
                        style={styles.flatListTraffic}
                        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                        data={ListTraffic}
                        renderItem={_renderCardTraffic}
                        snapToInterval={200}
                        keyExtractor={({ id }) => id}
                        ListEmptyComponent={<MyText light bold black style={{ marginHorizontal: '5%' }}>Oops, Traffic kosong nih...!</MyText>}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                    />
                </View>
            </View>
            <ExitBar logout={_logOut} />
            <AkunModals ref={refAkunModals} submitProfile={_saveProfile} userData={userData} />
        </View >
    )
})