import { Image, TouchableOpacity } from 'react-native'
import React, { useEffect, memo, useState, useCallback, forwardRef, useImperativeHandle } from 'react'
import { log, UUID, CONSTANT } from '@Utils';
import { useTheme } from 'react-native-paper';
import { UseKeyboard } from '@CustomHooks';
import styles from './styles';
import { MyText } from '@Atoms';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';



export default memo(forwardRef(({ onChange, navigation: { navigate }, INITIAL_PAGE = null }, ref) => {
    const { colors } = useTheme();
    const [activeMenu, setActiveMenu] = useState(INITIAL_PAGE == null ? 'Home' : CONSTANT.NAVBAR_MENU[INITIAL_PAGE].title)
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
    const toggle = (bottom, opacity) => _animateNavbar(bottom, opacity)
    useImperativeHandle(ref, () => ({
        toggle,
    }));
    useEffect(() => {
        isKeyBoardOpen ? _animateNavbar(-66, 0) : _animateNavbar(0, 1)
        return () => {
        }
    })
    return (
        <Animated.View style={[styles.navbarContainer, yPosNavbarStyle]}>
            {CONSTANT.NAVBAR_MENU.map(({ icon, iconActive, title }, index) =>
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
}))