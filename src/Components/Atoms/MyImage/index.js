import { View, Image, Text } from 'react-native'
import React, { memo, useState } from 'react'

export default memo(({ source, style, ...rest }) => {
    const [loaded, setLoaded] = useState(true)
    return (
        <>
            <Image source={source} style={style} {...rest} onLoadEnd={() => setTimeout(() => setLoaded(false), 1000)} />
            {loaded == true && <View style={{ position: 'absolute', ...style, top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,.7)' }} />}
        </>
    )
})
