import { View, TouchableOpacity } from 'react-native';
import React, { useEffect, memo } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CardOrder } from '@Organisms';
import styles from './styles';
export default memo(({ navigation }) => {
    const { colors } = useTheme();

    useEffect(() => {
        log('Mount TransTemp');
        return () => {
            log('Unmount TransTemp')
        }
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <MyText medium bold left color={colors.black}>Daftar Transaksi</MyText>
            </View>
            <View style={styles.sectionTitle}>
                <MyText small color={colors.black}>90 Total Pesanan</MyText>
                <TouchableOpacity
                    activeOpacity={.8}
                    style={[styles.sectionTitle, styles.btnSection]}>
                    <MyText light color={colors.black}>Terbayar</MyText>
                    <Icon name='chevron-down' size={15} />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <CardOrder orderStatus={true} orderDone={false} />
                <CardOrder orderStatus={true} orderDone={false} />
                <CardOrder orderStatus={true} orderDone={false} />
            </View>
        </View>
    )
})