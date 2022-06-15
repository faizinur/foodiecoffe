import { View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { MyText } from '@Atoms'
import { useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IC_PRODUCT } from '@Atoms/Icons';

import styles from './styles'
export default (props) => {
    const { colors } = useTheme()
    return (
        <>
            <View
                style={{ width: '100%', height: 110, paddingHorizontal: 14, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <Image source={IC_PRODUCT} />
                <View style={{ flex: 1, paddingHorizontal: 15, height: 80 }}>
                    <MyText left bold color={colors.black}>Cappuccino Venti</MyText>
                    <MyText left light color={colors.black}>Rp.245.900</MyText>
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: 80, height: 40, }}>
                        <TouchableOpacity activeOpacuty={.9} onPress={props?.onAdd} style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: colors.wildWaterMelon, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name={'minus'} size={20} color={colors.wildWaterMelon} />
                        </TouchableOpacity>
                        <MyText left light color={colors.black} center>0</MyText>
                        <TouchableOpacity activeOpacuty={.9} onPress={props?.onRemove} style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: colors.wildWaterMelon, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name={'plus'} size={20} color={colors.wildWaterMelon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: colors.athensGray, width: '90%', alignSelf: 'center' }} />
        </>
    )
}