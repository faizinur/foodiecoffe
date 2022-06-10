import { View, TouchableOpacity, Image } from 'react-native';
import React, { memo } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import styles, { width } from './styles';
import { IC_CATEGORY } from '@Atoms/Icons';
export default memo(props => {
    const { colors } = useTheme();
    return (
        <View style={{ width: width / 3, height: 140, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
                activeOpacity={.8}
                onPress={props?.onPress}
                style={{ height: 130, backgroundColor: colors.white }}>
                <Image source={IC_CATEGORY} resizeMode={'stretch'} style={{ height: 100, width: 100, borderRadius: 10, marginVertical: 4 }} />
                <MyText bold color={colors.black}>{props?.category}</MyText>
            </TouchableOpacity>
        </View>
    )
})
