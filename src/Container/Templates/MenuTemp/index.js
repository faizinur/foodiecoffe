import { View, TouchableOpacity } from 'react-native';
import React, { useEffect, memo, useCallback, useRef } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { TitleBar } from '@Molecules';
import { CardMenu } from '@Organisms';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import MenuModals from './MenuModals';
import { MyText } from '@Atoms';
export default memo(({ navigation }) => {
    const { colors } = useTheme();
    const refMenuModals = useRef(<MenuModals />)
    const _onClickSetting = () => {
        log('_onClickSetting : ')
    }

    const MyPressableIcon = (props) => (<TouchableOpacity
        activeOpacity={.8}
        onPress={props.onClickSearch}
        style={styles.pressableIcon}>
        <Icon name={props.iconName} size={26} color={colors.black} />
    </TouchableOpacity>)

    const _onMenuPress = useCallback(() => {
        log('_onMenuPress : ')
        refMejaModals.current?.toggle({})
    }, [])
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
                <CardMenu onPress={_onMenuPress} />
            </View>
            <MenuModals ref={refMenuModals} />
        </View>
    )
})