import { View, TouchableOpacity, Image } from 'react-native';
import React, { memo } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText, MyImage } from '@Atoms';
import styles from './styles';
import { IC_PRODUCT } from '@Atoms/Icons';
export default memo(props => {

    const { colors } = useTheme();
    return (
        <TouchableOpacity activeOpacity={.9} onPress={() => props?.onPress(props.item)} style={styles.cardContainer}>
            <View style={styles.imgProduct} >
                <MyImage source={{ uri: props.item.image.url }} height={80} width={80} />
            </View>
            <View style={styles.imgDescription}>
                <MyText left medium bold black fontSize={14}>{props.item.name}</MyText>
                <MyText left light black>Rp.{props.item.price}</MyText>
                <MyText left numberOfLines={2} fontSize={10}>{props.item.description}</MyText>
            </View>
        </TouchableOpacity>
    )
})
