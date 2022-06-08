import { View, TouchableOpacity, Image } from 'react-native';
import React, { memo, useState } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import { IC_TRAFFIC_GRAPH } from '@Atoms/Icons';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default memo(props => {
    const { colors } = useTheme();
    return (
        <View style={{ width: '100%', flexGrow: 1, backgroundColor: colors.white, paddingHorizontal: '5%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 55, width: '100%', paddingHorizontal: '5%' }}>
                <MyText bold left center color={colors.black}>Traffic Hari Ini</MyText>
            </View>
            <View style={{ width: '100%' }}>
                <TouchableOpacity
                    activeOpacity={.8}
                    style={{
                        height: 102,
                        width: '100%',
                        borderRadius: 12,
                        backgroundColor: colors.white,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                    }}>
                    <View style={{ flex: 1, height: '100%', justifyContent: 'flex-end', alignItems: 'flex-start', padding: 16, }}>
                        <Icon name={'trending-up'} size={25} color={colors.cerulean} style={{ marginHorizontal: 5 }} />
                        <MyText left light>Revenue</MyText>
                        <MyText bold left color={colors.black}>Rp 12.000.000</MyText>
                    </View>
                    <View style={{ flex: 1, height: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Image source={IC_TRAFFIC_GRAPH} />
                    </View>
                </TouchableOpacity>
                <View style={{ height: 10 }} />
            </View>
        </View>
    )
})
