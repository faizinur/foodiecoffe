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
        <View style={styles.trafficWrapper}>
            <TouchableOpacity
                activeOpacity={.8}
                style={styles.trafficContainer}>
                <View style={styles.revenue}>
                    <Icon name={'trending-up'} size={25} color={colors.cerulean} style={styles.iconRevenue} />
                    <MyText left light>Revenue</MyText>
                    <MyText bold left black>{props.revenue}</MyText>
                </View>
                <View style={styles.graph}>
                    <Image source={IC_TRAFFIC_GRAPH} />
                </View>
            </TouchableOpacity>
            <View style={styles.divider} />
        </View>
    )
})
