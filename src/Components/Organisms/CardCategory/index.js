import { View, TouchableOpacity, Image } from 'react-native';
import React, { memo } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import styles, { width } from './styles';
export default memo(props => {
    const { colors } = useTheme();
    return (
        <View style={styles.cardWrapper(props?.numColumns)}>
            <TouchableOpacity
                activeOpacity={.8}
                onPress={() => props?.onPress(props?.merchant)}
                style={styles.cardContainer}>
                <Image source={{ uri: props?.merchant?.image?.url }} resizeMode={'cover'} style={styles.cardImage} />
                <MyText bold color={colors.black}>{props?.merchant?.name}</MyText>
            </TouchableOpacity>
        </View>
    )
})
