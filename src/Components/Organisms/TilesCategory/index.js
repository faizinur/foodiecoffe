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
                activeOpacity={.8}
                onPress={() => props?.onPress(props?.merchant)}
                style={styles.cardContainer}>
                <MyImage source={{ uri: props?.merchant?.image?.url }} height={98} width={98} resizeMode={'cover'} />
                <MyText bold center black>{props?.merchant?.name}</MyText>
            </TouchableOpacity>
        </View>
    )
})
