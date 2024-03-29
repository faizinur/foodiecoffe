import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { MyText, MyImage } from '@Atoms'
import { useTheme, Chip } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { log } from '@Utils';

export default (props) => {
    const { colors } = useTheme()
    return (
        <>
            <View style={{ width: '100%', height: 110, paddingHorizontal: 14, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <MyImage source={{ uri: props?.item?.image?.url }} height={80} width={80} radius={[12, 12, 12, 12]} />
                <View style={{ flex: 1, paddingHorizontal: 15, height: 80 }}>
                    <MyText left bold black>{props?.item?.name}</MyText>
                    <MyText left light black>Rp.{props?.item?.price}</MyText>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: 80, height: 40, }}>
                            <TouchableOpacity activeOpacuty={.9} onPress={props?.onAdd} disabled={props?.item?.qty < 1} style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: props?.item?.qty < 1 ? colors.silverChalice : colors.wildWaterMelon, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name={'minus'} size={20} color={props?.item?.qty < 1 ? colors.silverChalice : colors.wildWaterMelon} />
                            </TouchableOpacity>
                            <MyText left light color={props?.item?.qty < 1 ? colors.silverChalice : colors.black} center>{props?.item?.qty}</MyText>
                            <TouchableOpacity activeOpacuty={.9} onPress={props?.onRemove} style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: colors.wildWaterMelon, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name={'plus'} size={20} color={colors.wildWaterMelon} />
                            </TouchableOpacity>
                        </View>
                        {((props?.item?.addons.length || 0) > 0 || (props?.item?.options.length || 0) > 0) && props?.item?.qty > 0 && <Chip selectedColor={Object.keys(props?.item?.notes).length > 0 ? colors.cerulean : colors.jumbo} onPress={props?.addNotes} icon={'pencil'} textStyle={{ fontSize: 12, width: '100%' }} style={{ height: 33, width: 100, borderWidth: .5, backgroundColor: colors.white, borderColor: Object.keys(props?.item?.notes).length > 0 ? colors.cerulean : colors.athensGray }}>Catatan</Chip>}
                    </View>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: colors.athensGray, width: '90%', alignSelf: 'center' }} />
        </>
    )
}