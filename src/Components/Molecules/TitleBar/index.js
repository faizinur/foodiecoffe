import { View, Dimensions } from 'react-native'
import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native'
import { MyText } from '@Atoms';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
const { width } = Dimensions.get('screen');
import { back } from '@RootNavigation';
export default memo(props => {
    const { colors } = useTheme()
    return (<View style={{ width, backgroundColor: colors.white, height: 60, flexDirection: 'row' }}>
        <TouchableOpacity
            activeOpacity={.9}
            onPress={() => 'customLeftPress' in props ? props?.customLeftPress() : back()}
            style={{ width: 50, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Icon name={'arrow-left'} size={25} color={colors.black} />
        </TouchableOpacity>
        {'renderTitle' in props && typeof props?.renderTitle == 'function' ? props?.renderTitle() :
            <MyText center color={colors.black} style={{ textTransform: 'capitalize' }}>{props?.title || 'Kembali'}</MyText>
        }
        {'renderRight' in props && typeof props?.renderRight == 'function' ? props?.renderRight()
            : <View style={{ width: 50, height: '100%', justifyContent: 'center', alignItems: 'center' }} />}
    </View>)
})