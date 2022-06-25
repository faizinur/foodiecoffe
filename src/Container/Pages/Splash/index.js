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
            let userData = await _getUserData();
            let newToken = await _refreshToken(userData.token);
            userData = {
                ...userData,
                ...{
                    token: {
                        access_token: newToken.token != null ? newToken.token : userData.token.access_token,
                    }
                }
            }
            dispatch(setUser(userData));
            replace('Home')
        } catch (e) {
            log('Splash on mount', e)
            replace('Login')
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