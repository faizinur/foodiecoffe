import { View, Image, TouchableOpacity, } from 'react-native';
import React, { memo } from 'react';
import { log, CONSTANT } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText, MyImage } from '@Atoms';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
export default memo(props => {
    const { colors } = useTheme();
    return (
        <View style={styles.cardProfileWrapper}>
            <View style={styles.avatarContainer}>
                <MyImage source={{ uri: `${CONSTANT.BASE_URL}${props.userData.image.name}` }} width={60} height={60} radius={[30, 30, 30, 30]} />
            </View>
            <View style={styles.descriptionContainer}>
                <MyText left medium bold black>{props.userData.name}</MyText>
                <MyText left light>{props.userData.email}</MyText>
                <View style={styles.role}>
                    <View style={styles.roleName}>
                        <MyText center bold light color={colors.white} style={styles.textRole} numberOfLines={1}>{props.userData.role}</MyText>
                    </View>
                    <MyText center black>  <Icon name={'star-face'} size={25} color={colors.lightningYellow} />  x/5</MyText>
                </View>
            </View>
            <TouchableOpacity
                style={styles.buttonEdit}
                activeOpacity={.7}
                onPress={props?.onEditProfilePress}>
                <Icon name={'pencil-outline'} size={20} color={colors.cerulean} style={styles.icPencil} />
            </TouchableOpacity>
        </View>
    )
})