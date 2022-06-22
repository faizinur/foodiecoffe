import { View, Image, TouchableOpacity, } from 'react-native';
import React, { memo } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import { IC_DEFAULT_PROFILE } from '@Atoms/Icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
export default memo(props => {
    const { colors } = useTheme();
    return (
        <View style={styles.cardProfileWrapper}>
            <View style={styles.avatarContainer}>
                <Image source={IC_DEFAULT_PROFILE} style={styles.avatar} />
            </View>
            <View style={styles.descriptionContainer}>
                <MyText left medium bold black>Riza Sulaemans</MyText>
                <MyText left light>riza_sulamemans@gmail.com</MyText>
                <View style={styles.role}>
                    <View style={styles.roleName}>
                        <MyText center bold light color={colors.white}>Kasir</MyText>
                    </View>
                    <View style={styles.rating} />
                    <MyText center light bold black>4.8/5</MyText>
                </View>
            </View>
            <TouchableOpacity
                style={styles.buttonEdit}
                activeOpacity={.7}
                onPress={props?.onEditProfilePress}>
                <Icon name={'pencil-outline'} size={20} color={colors.cerulean} style={{ marginHorizontal: 5 }} />
            </TouchableOpacity>
        </View>
    )
})