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
            style={{ width: '100%', height: 100, flexDirection: 'row' }}>
            <Image source={IC_AVATAR_ORDER_SUCCESS} style={{ margin: 16 }} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MyText left medium bold color={colors.black} numberOfLines={1} style={{ width: '80%' }}>Didin Ruhiyat</MyText>
                <MyText left light >INV • 20220325/040303</MyText>
                <MyText left bold ><Icon name='phone' /> 0852 2171 1234</MyText>
            </View>
            <View style={{ width: 100, justifyContent: 'space-between', alignItems: 'center', marginVertical: 16 }}>
                <View style={{ backgroundColor: colors.cerulean, width: 63, height: 26, borderRadius: 6 }}>
                    <MyText color={colors.white}>Table 8</MyText>
                </View>
                <MyText light >
                    <Icon name='clock-time-four-outline' /> 15m ago
                </MyText>
            </View>
        </TouchableOpacity>
    )
}