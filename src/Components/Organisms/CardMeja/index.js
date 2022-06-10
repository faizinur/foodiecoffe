import { View, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import styles, { width } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default memo(props => {
    const { colors } = useTheme();
    const textColor = props?.available ? colors.lightgray : colors.black;
    const iconColor = props?.available ? colors.lightgray : colors.cerulean;
    const iconName = props?.available ? 'silverware-fork-knife' : 'qrcode';
    const disabled = props?.available || false;
    return (
        <View style={styles.cardWrapper(width / props?.numColumns)}>
            <TouchableOpacity
                disabled={disabled}
                activeOpacity={.9}
                onPress={() => props?.onPress(props)}
                style={[styles.cardShadow, styles.container]}>
                <View style={styles.qrWrapper}>
                    <MyText large bold color={textColor}>{props?.number || '??'}</MyText>
                    <View style={styles.qr}>
                        <Icon name={iconName} size={25} color={iconColor} />
                    </View>
                </View>
                <MyText left small bold color={textColor}>{props?.location || 'Lantai ?'}</MyText>
                <MyText left light color={textColor}>{props?.capacity || 'x - x'} Orang</MyText>
            </TouchableOpacity>
        </View>
    )
})
