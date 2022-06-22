import { View, Image } from 'react-native'
import React, { memo } from 'react'
import styles from './styles';
import { IC_PRODUCT_NOT_FOUND } from '@Atoms/Icons';
import { MyText } from '@Atoms';
export default memo((props) => {
    return (
        <View style={styles.container}>
            <Image source={IC_PRODUCT_NOT_FOUND} />
            <MyText center bold large black left style={styles.title}>{props?.title}</MyText>
            <MyText center left style={styles.subTitle}>{props?.subTitle}</MyText>
        </View>
    )
})