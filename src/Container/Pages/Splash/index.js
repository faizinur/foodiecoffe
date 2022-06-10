import { View, Image } from 'react-native'
import React, { useEffect, memo } from 'react'
import { useDispatch } from "react-redux";
import { log } from '@Utils';
import { IC_SPLASH } from '@Atoms/Icons';
import { setUser } from '@Actions';
import { useTheme } from 'react-native-paper';

export default memo(({ navigation: { replace } }) => {
    const { colors } = useTheme();
    //dispatcher
    const dispatch = useDispatch();

    useEffect(() => {
        log('Mount Splash');
        dispatch(setUser({ email: "email@email.com", password: "1234", "username": 'FoodieCoffe' }))
        setTimeout(() => replace('Login'), 1000);
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
