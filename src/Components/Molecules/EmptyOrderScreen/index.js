import { View, Image } from 'react-native'
import React, { memo } from 'react'
import styles from './styles';
import { IC_APP } from '@Atoms/Icons';
import { MyText } from '@Atoms';
import { useTheme, FAB } from 'react-native-paper';
export default memo(() => {
    const { colors } = useTheme();
    return (
        <View style={styles.content}>
            <View style={styles.pendingImageContainer}>
                <Image source={IC_APP} />
            </View>
            <MyText fontSize={24} lineHeight={30} center bold color={colors.black}>Menunggu Pesanan</MyText>
            <MyText fontSize={14} lineHeight={20} bold center style={styles.textCenter}>Saat ini belum ada pesanan yang masuk atau dipesan.</MyText>
        </View>
    )
})