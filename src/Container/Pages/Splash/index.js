import { View, Image } from 'react-native'
import React, { useEffect, memo, useCallback } from 'react'
import { useDispatch } from "react-redux";
import { log, MyRealm } from '@Utils';
import { IC_SPLASH } from '@Atoms/Icons';
import { setUser } from '@Actions';
import { useTheme } from 'react-native-paper';

export default memo(({ navigation: { replace } }) => {
    const { colors } = useTheme();
    //dispatcher
    const dispatch = useDispatch();
    const _onMount = useCallback(async () => {
        let select = await MyRealm.selectData()
        if (select.length > 0) {
            let values = JSON.parse(select[0].value)
            dispatch(setUser(values));
            replace('Home')
        } else {
            replace('Login')
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
