import { View, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default memo(props => {
    const { colors } = useTheme();
    return (
        <View style={{ width: '100%', height: 132, backgroundColor: colors.emerald }}>
            <MyText>CARD Traffic</MyText>
        </View>
    )
})
