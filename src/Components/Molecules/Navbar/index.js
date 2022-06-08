import { Image, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, memo, useState, useCallback } from 'react'
import { log, UUID } from '@Utils';
import { useTheme } from 'react-native-paper';
import { UseKeyboard } from '@CustomHooks';
import {
    IC_HOME,
    IC_TRANSAKSI,
    IC_MENU,
    IC_MEJA,
    IC_AKUN
} from '@Atoms/Icons';
import styles from './styles';
import { MyText } from '@Atoms';
const navMenu = [
    {
        icon: IC_HOME,
        title: 'Home',
    },
    {
        icon: IC_TRANSAKSI,
        title: 'Transaksi',
    },
    {
        icon: IC_MENU,
        title: 'Menu',
    },
    {
        icon: IC_MEJA,
        title: 'Meja',
    },
    {
        icon: IC_AKUN,
        title: 'Akun',
    },
]
export default memo(({ onChange, navigation: { navigate } }) => {
    const { colors } = useTheme();
    const [activeMenu, setActiveMenu] = useState('Home')
    const refSliderAnimation = React.useRef(new Animated.Value(0)).current;
    const onMenuPress = useCallback((title, index) => {
        if (index == 4) {
            navigate('Akun')
            return false;
        }
        setActiveMenu(title);
        onChange(index)
    }, [activeMenu]);

    const isKeyBoardOpen = UseKeyboard();
    const _animateNavbar = useCallback((toValue) => {
        return Animated.timing(refSliderAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [])
    useEffect(() => {
        log('Mount Navbar')
        isKeyBoardOpen ? _animateNavbar(66) : _animateNavbar(0)
        return () => {
            log('Unmount Navbar')
        }
    })
    return (
        <Animated.View style={[styles.navbarContainer, { transform: [{ translateY: refSliderAnimation }] }]}>
            {
                navMenu.map(({ icon, title }, index) =>
                    <TouchableOpacity
                        activeOpacity={.8}
                        onPress={() => onMenuPress(title, index)}
                        key={`${title}-${UUID()}`}
                        style={styles.navItem}>
                        <Image source={icon}
                            style={styles.icon}
                            tintColor={activeMenu == title ? colors.cerulean : colors.jumbo}
                        />
                        <MyText center light color={activeMenu == title ? colors.cerulean : colors.jumbo}
                            style={styles.title(activeMenu == title ? '700' : '400')}>{title}</MyText>
                    </TouchableOpacity>)
            }
        </Animated.View >
    )
})