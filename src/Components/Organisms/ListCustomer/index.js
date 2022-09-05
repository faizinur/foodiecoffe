import { View, Image } from 'react-native'
import React from 'react'
import { IC_AVATAR_ORDER_SUCCESS } from '@Atoms/Icons'
import { MyText } from '@Atoms'
import { useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { log, DateDiff } from '@Utils';
import styles from './styles'
export default (props) => {
    const { colors } = useTheme()
    return (
        <View style={styles.container}>
            <Image source={IC_AVATAR_ORDER_SUCCESS} style={styles.img} />
            <View style={styles.customerInfo}>
                <MyText left medium black numberOfLines={1} style={styles.nameWidth}>{props.name}</MyText>
                <MyText left light>{props.invoice}</MyText>
                <MyText left light><Icon name='phone' />  {props.phone}</MyText>
            </View>
            <View style={styles.tableContainer}>
                <View style={styles.table}>
                    <MyText center light bold numberOfLines={1} color={colors.white}>Table {props?.tableNumber || '?'}</MyText>
                </View>
                <MyText light right><Icon name='clock-time-four-outline' /> {DateDiff(props.createdAt)}</MyText>
            </View>
        </View>
    )
}