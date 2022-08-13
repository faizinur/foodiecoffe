import { View, TouchableOpacity, Image } from 'react-native';
import React, { memo } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText, MyImage } from '@Atoms';
import styles, { width } from './styles';
export default memo(props => {
    const { colors } = useTheme();
    return (
        <View style={styles.cardWrapper(props?.numColumns)}>
            <TouchableOpacity
                onPress={() => props?.onPress(props?.merchant)}
                activeOpacity={.8}>
                <MyImage source={{ uri: props?.merchant?.image?.url || 'https://via.placeholder.com/150' }} height={98} width={98} resizeMode={'cover'} />
                <MyText bold center black numberOfLines={1}>{props?.merchant?.name}</MyText>
            </TouchableOpacity>
        </View>
    )
})