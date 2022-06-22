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
        <TouchableOpacity activeOpacity={.9} onPress={props?.onPress} style={styles.cardContainer}>
            <Image source={IC_PRODUCT} style={styles.imgProduct} />
            <View style={styles.imgDescription}>
                <MyText left medium bold black>Caramel Macchiato</MyText>
                <MyText left black>Rp.60.250</MyText>
                <MyText left light numberOfLines={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames interdum diam. </MyText>
            </View>
        </TouchableOpacity>
    )
})
