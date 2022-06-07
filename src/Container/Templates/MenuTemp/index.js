import { View, Image } from 'react-native';
import React, { useEffect, memo } from 'react';
import { log } from '@Utils';
import { IC_SPLASH } from '@Atoms/Icons';
import { useTheme } from 'react-native-paper';

export default memo(({ navigation }) => {
    const { colors } = useTheme();

    useEffect(() => {
        log('Mount MenuTemp');
        return () => {
            log('Unmount MenuTemp')
        }
    }, [])
    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: colors.lightningYellow, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={IC_SPLASH} resizeMethod={'auto'} />
        </View>
    )
})
