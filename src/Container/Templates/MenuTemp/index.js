import { View, TouchableOpacity } from 'react-native';
import React, { useEffect, memo, useCallback } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { TitleBar } from '@Molecules';
import { CardMenu } from '@Organisms';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { MyText } from '@Atoms';
export default memo(({ navigation }) => {
    const { colors } = useTheme();

    const _onClickSetting = () => {
        log('_onClickSetting : ')
    }

    const MyPressableIcon = (props) => (<TouchableOpacity
        activeOpacity={.8}
        onPress={props.onClickSearch}
        style={styles.pressableIcon}>
        <Icon name={props.iconName} size={26} color={colors.black} />
    </TouchableOpacity>)

    useEffect(() => {
        log('Mount MenuTemp');
        return () => {
            log('Unmount MenuTemp')
        }
    }, [])
    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: colors.white }}>
            <TitleBar
                disabledLeft={true}
                title={'Daftar Menu'}
                renderRight={() => <MyPressableIcon onClickSearch={_onClickSetting} iconName={'cog'} />} />
            <View style={{ paddingHorizontal: '5%' }}>
                <CardMenu onPress={() => log('Product Pressed! ')} />
            </View>
        </View>
    )
})