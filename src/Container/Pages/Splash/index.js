import { UseAuth } from '@ViewModel';
import { View, Image } from 'react-native'
import React, { useEffect, memo, useCallback, useState } from 'react'
import { log } from '@Utils';
import { IC_SPLASH } from '@Atoms/Icons';
import { useTheme } from 'react-native-paper';
export default memo(({ navigation: { replace } }) => {
    const { _getUserData } = UseAuth();
    const { colors } = useTheme();
    const _onMount = useCallback(async () => {
        try {
            let userData = await _getUserData();
            if (userData != null) replace('Home')
        } catch (e) {
            log('Splash on mount', e)
            setTimeout(() => replace('Login'), 1000)
        }
    }, [])
    useEffect(() => {
        log('Mount Splash');
        _onMount()
        return () => {
            log('Unmount Splash')
        }
    }, [])
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <Image source={IC_SPLASH} resizeMethod={'auto'} />
        </View>
    )
})