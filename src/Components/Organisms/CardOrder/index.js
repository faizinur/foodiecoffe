import { View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { IC_AVATAR_ORDER_SUCCESS } from '@Atoms/Icons'
import { MyText } from '@Atoms'
import { useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles'
import { log, DateDiff } from '@Utils'
export default (props) => {
    const { colors } = useTheme()
    return (
        <TouchableOpacity
            style={styles.cardContainer}
            activeOpacity={.9}
            onPress={props?.onPress}>
            <View style={styles.userInfo}>
                <Image source={IC_AVATAR_ORDER_SUCCESS} />
                <View style={styles.userInfoWrapper}>
                    <View style={styles.userInfoDetail}>
                        <MyText fontSize={14} lineHeight={18} bold black numberOfLines={1} style={styles.userTextlength}>{props?.order?.name || 'Anonim'}</MyText>
                        <MyText fontSize={10} lineHeight={12}>
                            <Icon name='clock-time-four-outline' /> {DateDiff(props?.order?.createdAt)}</MyText>
                    </View>
                    <MyText left light fontSize={14} lineHeight={18} numberOfLines={1} style={styles.userTextlength}>{props?.order?.invoice}</MyText>
                </View>
            </View>
            <View style={styles.listOrder}>
                <MyText fontSize={12} lineHeight={15} bold numberOfLines={1} black center style={{ width: '85%' }}> • {props.order.menuName}</MyText>
                <View style={styles.orderCount}>
                    <MyText fontSize={12} lineHeight={14} center color={colors.cerulean} bold>+{props?.order?.items?.length}</MyText>
                </View>
            </View>
            <View style={styles.dashedLine} />
            <View style={styles.listPayment}>
                <View style={styles.tableNumber(colors.cerulean)}>
                    <MyText fontSize={10} color={colors.white} bold>Table {props?.order?.tableNumber}</MyText>
                </View>
                <MyText fontSize={14} lineHeight={18} center bold black>Rp{props?.order?.total}</MyText>
            </View>
        </TouchableOpacity>
    )
}