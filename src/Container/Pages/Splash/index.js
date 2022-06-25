import { UseAuth } from '@ViewModel';
import { View, Image } from 'react-native'
import React, { useEffect, memo, useCallback } from 'react'
import { useDispatch } from "react-redux";
import { log } from '@Utils';
import { IC_SPLASH } from '@Atoms/Icons';
import { setUser } from '@Actions';
import { useTheme } from 'react-native-paper';
export default memo(({ navigation: { replace } }) => {
    const { _getUserData, _refreshToken } = UseAuth();
    const { colors } = useTheme();
    //dispatcher
    const dispatch = useDispatch();
    const _onMount = useCallback(async () => {
        try {
            let userData = await _getUserData()
            let newToken = await _refreshToken(userData.token);
            if (newToken.token != null) userData.token.access_token = newToken.token;
            dispatch(setUser(userData));
            setTimeout(() => replace('Home'), 1500)
        } catch (e) {
            log('Splash on mount', e)
            setTimeout(() => replace('Login'), 1500)
        }
    }, [])
    useEffect(() => {
        log('Mount Splash');
        _onMount()
        // setTimeout(() => , 1000);
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