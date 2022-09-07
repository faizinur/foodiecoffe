import { View, Image } from 'react-native'
import React, { useState } from 'react'
import { IC_AVATAR_ORDER_SUCCESS } from '@Atoms/Icons'
import { MyText } from '@Atoms'
import { useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { log, DateDiff } from '@Utils';
import { TextInput } from 'react-native-paper';
import styles, { width } from './styles'

export default (props) => {
    const { colors } = useTheme()
    const [inputValue, setInputValue] = useState('');
    const onBlurText = () => props?.onTextBlur(inputValue)
    return (
        <View style={styles.container}>
            <View style={styles.flexContainer}>
                <View style={[styles.flexContainer, styles.flexRow]}>
                    <Image source={IC_AVATAR_ORDER_SUCCESS} style={styles.img} />
                    <View style={styles.flexContainer}>
                        <View style={[styles.flexContainer, styles.flexCenter]}>
                            <MyText left medium black numberOfLines={1} style={styles.nameWidth}>{props.name || 'nama admin'}</MyText>
                        </View>
                        <View style={[styles.flexContainer, styles.flexCenter]}>
                            <MyText left light>{props.invoice}</MyText>
                        </View>
                    </View>
                    <View style={styles.flexCenter}>
                        <View style={styles.table}>
                            <MyText center light bold numberOfLines={1} color={colors.white}>Table {props?.tableNumber || '?'}</MyText>
                        </View>
                    </View>
                </View>
                {props?.status == 'process' && (
                    <View style={[styles.flexContainer, styles.flexCenter,]}>
                        <TextInput
                            style={{ backgroundColor: colors.white, width: width * .9, fontSize: 12 }}
                            placeholder={'Placeholder'}
                            mode={'outlined'}
                            value={inputValue}
                            onChangeText={setInputValue}
                            onBlur={onBlurText}
                            theme={{ fonts: { regular: { fontFamily: 'ReadexProLight' } }, roundness: 12 }}
                            returnKeyType="next"
                        />
                    </View>
                ) ||
                    <View style={[styles.flexContainer, styles.flexCenter, styles.flexRow, { marginLeft: 51 }]}>
                        <View style={[styles.flexContainer, styles.flexCenter]}>
                            <MyText left light><Icon name='phone' />  {props.phone || 'nomor wewe'}</MyText>
                        </View>
                        <View style={styles.flexCenter}>
                            <MyText light right><Icon name='clock-time-four-outline' /> {DateDiff(props.createdAt)}</MyText>
                        </View>
                    </View>
                }
            </View>
        </View>
    )
}