import { View, StyleSheet } from 'react-native'
import { BLANK_IMAGE } from '@Atoms/Icons'
import React, { memo, useState } from 'react';
import Animated, { useAnimatedStyle, withTiming, } from 'react-native-reanimated';
import { Skeleton } from '@Atoms'

export default memo(({ height = 100, width = 100, source = BLANK_IMAGE, radius = [12, 12, 12, 12], resizeMode = 'cover', resizeMethod = 'resize' }) => {
    const [loaded, setLoaded] = useState(false);
    const animatedImageStyle = useAnimatedStyle(() => ({
        opacity: withTiming(loaded ? 1 : 0, { duration: 300 }),
        transform: [{ scale: withTiming(loaded ? 1 : .8, { duration: 300 }) }]
    }))
    const styles = StyleSheet.create({
        defaultStyle: [StyleSheet.absoluteFill, {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: loaded ? 'transparent' : 'rgba(0,0,0,.05)',
            borderTopLeftRadius: radius[0],
            borderTopRightRadius: radius[1],
            borderBottomLeftRadius: radius[3],
            borderBottomRightRadius: radius[2],
            width,
            height
        }]
    })
    const setLoad = () => setLoaded(true)
    return (
        <View style={{ width, width }}>
            <Animated.Image
                onLoadEnd={setLoad}
                source={source}
                style={[styles.defaultStyle, animatedImageStyle]}
                resizeMode={resizeMode}
                resizeMethod={resizeMethod}
            />
            {!loaded && <Skeleton.Image style={{ ...styles.defaultStyle }} />}
        </View>
    )
})