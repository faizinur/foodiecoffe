import { View, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default memo(props => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            activeOpacity={props?.isServed ? 1 : .9}
            onPress={props?.isServed ? undefined : props?.onPress}
            style={props?.isServed ? styles.container : [styles.cardShadow, styles.container]}>
            <View style={styles.qrWrapper}>
                <MyText large bold color={props?.isServed ? colors.lightgray : colors.black}>{props?.number || '??'}</MyText>
                <View style={styles.qr}>
                    <Icon name={props?.isServed ? 'silverware-fork-knife' : 'qrcode'} size={25} color={props?.isServed ? colors.lightgray : colors.cerulean} />
                </View>
            </View>
            <MyText left small bold color={props?.isServed ? colors.lightgray : colors.black}>{props?.location || 'Lantai ?'}</MyText>
            <MyText left light color={props?.isServed ? colors.lightgray : colors.black}>{props?.capacity || 'x - x'} Orang</MyText>
            {props?.isServed && <View style={styles.servedOverlay} />}
        </TouchableOpacity>
    )
})
