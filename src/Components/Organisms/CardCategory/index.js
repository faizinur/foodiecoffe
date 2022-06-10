import { View, TouchableOpacity, Image } from 'react-native';
import React, { memo } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import styles, { width } from './styles';
import { IC_CATEGORY } from '@Atoms/Icons';
export default memo(props => {
    const { colors } = useTheme();
    return (
        <View style={styles.cardWrapper(props?.numColumns)}>
            <TouchableOpacity
                activeOpacity={.8}
                onPress={props?.onPress}
                style={styles.cardContainer}>
                <Image source={IC_CATEGORY} resizeMode={'stretch'} style={styles.cardImage} />
                <MyText bold color={colors.black}>{props?.category}</MyText>
            </TouchableOpacity>
        </View>
    )
})
