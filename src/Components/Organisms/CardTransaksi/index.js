import { View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { IC_AVATAR_ORDER_SUCCESS, IC_AVATAR_ORDER_FAIL } from '@Atoms/Icons'
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
                <Image source={props?.item?.status == 'success' ? IC_AVATAR_ORDER_SUCCESS : IC_AVATAR_ORDER_FAIL} />
                <View style={styles.userInfoWrapper}>
                    <View style={styles.userInfoDetail}>
                        <MyText fontSize={14} lineHeight={18} bold black numberOfLines={1} style={styles.userTextlength}>{props?.item?.name}</MyText>
                        <View style={styles.tableNumber(colors.cerulean)}>
                            <MyText fontSize={10} lineHeight={12} center color={colors.white} bold numberOfLines={1}>Table 1</MyText>
                        </View>
                    </View>
                    <MyText left light fontSize={14} lineHeight={18} numberOfLines={1} style={styles.userTextlength}>{props?.item?.invoice}</MyText>
                    <View style={styles.userInfoDetail}>
                        <MyText fontSize={10} lineHeight={12}>
                            <Icon name='phone-outline' /> {props?.item?.phone}
                        </MyText>
                        <MyText fontSize={10} lineHeight={12}>
                            <Icon name='clock-time-four-outline' /> {DateDiff(props?.item?.createdAt)}
                        </MyText>
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    )
}