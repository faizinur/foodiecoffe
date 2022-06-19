import { View, Image } from 'react-native'
import React from 'react'
import { IC_PRODUCT } from '@Atoms/Icons'
import { MyText } from '@Atoms'
import { useTheme, List } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { log } from '@Utils'
import styles from './styles'
export default (props) => {
    const { colors } = useTheme()
    return (
        <View style={{ marginVertical: 16 }}>
            <List.Accordion
                title={`Pesanan ${props?.orders?.length > 0 ? `(${props?.orders?.length})` : ''}`}
                style={{ backgroundColor: colors.white, padding: 0, marginHorizontal: -8, }}
                titleStyle={{ color: colors.black, fontSize: 15, fontWeight: 'bold', fontFamily: 'ReadexProMedium' }}>
                {props?.orders?.map((item, index) => (
                    <View key={`order-${index}`}>
                        {log(item)}
                        <View style={styles.listContainer}>
                            <Image source={IC_PRODUCT} style={styles.img} />
                            <View style={styles.productDetail}>
                                <View style={styles.innerContainer}>
                                    <MyText fontSize={14} color={colors.black}>{item?.menuName}</MyText>
                                    <View style={styles.orderState}>
                                        <Icon name='check' size={17} color={colors.emerald} />
                                    </View>
                                </View>
                                 <MyText numberOfLines={2} left style={styles.notes} color={colors.black} fontSize={10}>
                                    <MyText bold color={colors.black}>Catatan :</MyText>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </MyText>
                                <View style={styles.innerContainer}>
                                    <View style={styles.orderTable}>
                                        <MyText light bold color={colors.cerulean}>x{item?.qty}</MyText>
                                    </View>
                                    <MyText bold light color={colors.black}><MyText strikeThrough>{item?.discount > 0 ? `Rp${item?.price}` : ''}</MyText>  Rp{parseInt(item?.price)-parseInt(item?.discount)}</MyText>
                                </View>
                            </View>
                        </View>
                        <View style={styles.divider} />
                    </View>
                ))}
            </List.Accordion>
        </View>
    )
}