import { Text } from 'react-native'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTheme } from 'react-native-paper';
import { log } from '@Utils'
export default forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        setNativeProps: (styles = {}) => {
            refText.current?.setNativeProps(styles)
        }
    }));
    const refText = useRef(<Text />);
    const { colors } = useTheme();
    const textStyle = {
        color: 'color' in props ? props?.color : colors.jumbo,
        fontFamily: 'bold' in props ? 'ReadexProBold' : ('medium' in props ? 'ReadexProMedium' : 'ReadexProLight'),
        fontSize: 'large' in props ? 24 : ('medium' in props ? 16 : ('light' in props ? 12 : props?.fontSize)),
        lineHeight: 'large' in props ? 30 : ('medium' in props ? 22 : ('small' in props ? 20 : props?.lineHeight)),
        alignSelf: 'center' in props ? 'center' : ('right' in props ? 'flex-end' : ('left' in props ? 'flex-start' : 'center')),
        // marginVertical: props.marginVertical ?? 6,
        ...props?.style
    }
    const ellipsizeMode = 'ellipsizeMode' in props ? props?.ellipsizeMode : 'tail';
    const numberOfLines = 'numberOfLines' in props ? props?.numberOfLines : 4;
    return (
        <Text
            ref={refText}
            onPress={props.onPress}
            style={textStyle}
            ellipsizeMode={ellipsizeMode}
            numberOfLines={numberOfLines}
        >{props?.children}</Text>
    )
})