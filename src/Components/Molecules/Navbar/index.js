import { Image, TouchableOpacity } from 'react-native'
import React, { useEffect, memo, useState, useCallback } from 'react'
import { log, UUID, CONSTANT } from '@Utils';
import { useTheme } from 'react-native-paper';
import { UseKeyboard } from '@CustomHooks';
import {
    IC_HOME,
    IC_HOME_FILL,
    IC_TRANSAKSI,
    IC_TRANSAKSI_FILL,
    IC_MENU,
    IC_MENU_FILL,
    IC_MEJA,
    IC_MEJA_FILL,
    IC_AKUN,
    IC_AKUN_FILL,
} from '@Atoms/Icons';
import styles from './styles';
import { MyText } from '@Atoms';
const navMenu = [
    {
        icon: IC_HOME,
        iconActive: IC_HOME_FILL,
        title: 'Home',
    },
    {
        icon: IC_TRANSAKSI,
        iconActive: IC_TRANSAKSI_FILL,
        title: 'Transaksi',
    },
    {
        icon: IC_MENU,
        iconActive: IC_MENU_FILL,
        title: 'Menu',
    },
    {
        icon: IC_MEJA,
        iconActive: IC_MEJA_FILL,
        title: 'Meja',
    },
    {
        icon: IC_AKUN,
        iconActive: IC_AKUN_FILL,
        title: 'Akun',
    },
]
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';


export default memo(({ onChange, navigation: { navigate } }) => {
    const { colors } = useTheme();
    const [activeMenu, setActiveMenu] = useState('Home')
    const onMenuPress = useCallback((title, index) => {
        if (index == 4) {
            navigate('Akun')
            return false;
        }
        setActiveMenu(title);
        onChange(index)
    }, [activeMenu]);

    const isKeyBoardOpen = UseKeyboard();
    const yPosNavbar = useSharedValue({ bottom: 0, opacity: 1 })
    const yPosNavbarStyle = useAnimatedStyle(() => ({
        bottom: withSpring(yPosNavbar.value.bottom, CONSTANT.SPRING_CONFIG),
        opacity: withSpring(yPosNavbar.value.opacity, CONSTANT.SPRING_CONFIG)
    }))

    const _animateNavbar = useCallback((bottom, opacity) => {
        yPosNavbar.value = { bottom, opacity };
    }, [])
    useEffect(() => {
        log('Mount Navbar')
        isKeyBoardOpen ? _animateNavbar(-66, 0) : _animateNavbar(0, 1)
        return () => {
            log('Unmount Navbar')
        }
    })
    return (
        <Animated.View style={[styles.navbarContainer, yPosNavbarStyle]}>
            {navMenu.map(({ icon, iconActive, title }, index) =>
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => onMenuPress(title, index)}
                    key={`${title}-${UUID()}`}
                    style={styles.navItem}>
                    <Image source={activeMenu == title ? iconActive : icon} style={styles.icon} />
                    <MyText center light color={activeMenu == title ? colors.cerulean : colors.jumbo}
                        style={styles.title(activeMenu == title ? '700' : '400')}>{title}</MyText>
                </TouchableOpacity>)}
        </Animated.View >
    )
})