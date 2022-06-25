import { View, TouchableOpacity, Image } from 'react-native';
import React, { memo } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import styles from './styles';
import { IC_PRODUCT } from '@Atoms/Icons';
export default memo(props => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity activeOpacity={.9} onPress={() => props?.onPress(props.item)} style={styles.cardContainer}>
            <Image source={{ uri: props.item.image.url }} style={styles.imgProduct} />
            <View style={styles.imgDescription}>
                <MyText left medium bold black>{props.item.name}</MyText>
                <MyText left black>Rp.{props.item.price}</MyText>
                <MyText left light numberOfLines={2}>{props.item.description}</MyText>
            </View>
        </TouchableOpacity>
    )
})
