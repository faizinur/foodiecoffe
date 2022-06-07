import { View, Image, TouchableOpacity } from 'react-native'
import React, { memo, useState, useCallback } from 'react'
import { log, UUID } from '@Utils';
import { useTheme } from 'react-native-paper';
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
export default memo(({ onChange }) => {
    const { colors } = useTheme();
    const [activeMenu, setActiveMenu] = useState('Home')
    const onMenuPress = useCallback((title, index) => {
        setActiveMenu(title);
        onChange(index)
    }, [activeMenu])
    return (
        <View style={styles.navbarContainer}>
            {navMenu.map(({ icon, title }, index) =>
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
        </View >
    )
})