import { View, Dimensions } from 'react-native'
import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native'
import { MyText } from '@Atoms';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
const { width } = Dimensions.get('screen');
import { back } from '@RootNavigation';
import { log } from '@Utils'
export default memo(props => {
    log(props.disabledLeft)
    const { colors } = useTheme()
    return (<View style={{ width, backgroundColor: colors.white, height: 60, flexDirection: 'row', }}>
        {
            props.disabledLeft != true ?
                <TouchableOpacity
                    activeOpacity={.9}
                    onPress={() => 'customLeftPress' in props ? props?.customLeftPress() : back()}
                    style={{ width: 50, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name={'arrow-left'} size={25} color={colors.black} />
                </TouchableOpacity>
                :
                <View style={{ width: '5%', height: '100%', justifyContent: 'center', alignItems: 'center' }} />
        }
        {'renderTitle' in props && typeof props?.renderTitle == 'function' ? props?.renderTitle() :
            <MyText center color={colors.black} style={{ textTransform: 'capitalize', flexGrow: 1 }}>{props?.title || 'Kembali'}</MyText>
        }
        <View style={{ width: 50, height: '100%', justifyContent: 'center', alignItems: 'center' }} >
            {'renderRight' in props && typeof props?.renderRight == 'function' && props?.renderRight()}
        </View>
    </View>)
})