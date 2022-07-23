import { View, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import styles, { width } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default memo(props => {
    const { colors } = useTheme();
    const textColor = props?.occupied ? colors.lightgray : (props?.selectedTable.id == props?.seat?.id ? colors.white : colors.black);
    const iconColor = props?.occupied ? colors.lightgray : colors.cerulean;
    const iconName = props?.occupied ? 'silverware-fork-knife' : 'qrcode';
    const disabled = props?.occupied || false;
    return (
        <View style={styles.cardWrapper(width / props?.numColumns)}>
            <TouchableOpacity
                disabled={disabled}
                activeOpacity={.9}
                onPress={() => props?.onPress(props?.seat)}
                style={[styles.cardShadow, styles.container(props?.selectedTable?.id == props?.seat.id ? colors.cerulean : colors.white)]}>
                <View style={styles.qrWrapper}>
                    <MyText large bold color={textColor}>{props?.seat?.number || 'xx'}</MyText>
                    <View style={styles.qr}>
                        <Icon name={iconName} size={25} color={iconColor} />
                    </View>
                </View>
                <MyText left small bold color={textColor}>Lantai {props?.seat?.floor || 'Lantai xx'}</MyText>
                <MyText left light color={textColor}>{props?.seat?.seat || 'x - x'} Orang</MyText>
            </TouchableOpacity>
        </View>
    )
})

// {
//     "id": "C1779O",
//     "number": "MC2",
//     "floor": "2",
//     "seat": 4,
//     "qr": {
//         "title": "MC2",
//         "name": "QR_C1779O.png"
//     },
//     "occupied": true,
//     "merchantId": "B1778H",
//     "merchantName": "Mcdonalds"
// },