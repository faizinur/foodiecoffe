import { View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { IC_AVATAR_ORDER, IC_AVATAR_ORDER_SUCCESS, IC_AVATAR_ORDER_FAIL } from '@Atoms/Icons'
import { MyText } from '@Atoms'
import { useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles'
export default (props) => {
    const { colors } = useTheme()
    return (
        <TouchableOpacity
            style={styles.cardContainer}
            activeOpacity={.9}
            onPress={props?.onPress}>
            <View style={styles.userInfo}>
                <Image source={'orderStatus' in props ? (props?.orderStatus == 'paid' ? IC_AVATAR_ORDER_SUCCESS : IC_AVATAR_ORDER_FAIL) : IC_AVATAR_ORDER} />
                <View style={styles.userInfoWrapper}>
                    <View style={styles.userInfoDetail}>
                        <MyText fontSize={14} lineHeight={18} bold color={colors.black} numberOfLines={1} style={styles.userTextlength}>{props?.name}</MyText>
                        <MyText fontSize={10} lineHeight={12} >
                            <Icon name='clock-time-four-outline' /> 15m ago</MyText>
                    </View>
                    <MyText fontSize={14} lineHeight={18} numberOfLines={1} style={styles.userTextlength}>INV • 20220325/040303</MyText>
                </View>
            </View>
            <View style={styles.listOrder}>
                <MyText fontSize={12} lineHeight={15} bold numberOfLines={1} color={colors.black} center style={{ width: '85%' }}> • Luxury Fun Set Meat Lover Kebab Luxury Fun Luxury Fun Set Meat Lover Kebab Luxury Fun</MyText>
                <View style={styles.orderCount}>
                    <MyText fontSize={12} lineHeight={14} center color={colors.cerulean} bold>+3</MyText>
                </View>
            </View>
            <View style={styles.dashedLine} />
            <View style={styles.listPayment}>
                <View style={styles.tableNumber(props?.orderStatus == 'canceled' ? colors.black : colors.cerulean)}>
                    <MyText fontSize={10} lineHeight={12} center color={colors.white} bold numberOfLines={1} style={{ width: '80%' }}>Table 15</MyText>
                </View>
                <MyText fontSize={14} lineHeight={18} center bold color={colors.black}>Rp 212.000</MyText>
            </View>
        </TouchableOpacity>
    )
}