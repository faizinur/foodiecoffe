import { View, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, memo, useRef, useCallback } from 'react';
import { log, CONSTANT } from '@Utils';
import { useTheme } from 'react-native-paper';
import { TitleBar, InputItems } from '@Molecules';
import { MyText } from '@Atoms';
import { CardProduct } from '@Organisms';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UseMenu } from '@ViewModel'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import ModalProductList from './ModalProductList';
import ModalFilterProduct from './ModalFilterProduct';
import styles from './styles';
export default memo(({ navigation, route: { params } }) => {
    const { _getMenu, menuList, menuError, menuLoading } = UseMenu()
    const { colors } = useTheme();
    const refModalProductList = useRef(<ModalProductList />)
    const refModalFilterProduct = useRef(<ModalFilterProduct />)
    const navBarPosY = useSharedValue({ bottom: 0 })
    const navBarPosYStyle = useAnimatedStyle(() => ({
        bottom: withSpring(navBarPosY.value.bottom, CONSTANT.SPRING_CONFIG),
    }))
    const footerHeight = useSharedValue({ height: 80 })
    const footerHeightStyle = useAnimatedStyle(() => ({
        height: withSpring(footerHeight.value.height, CONSTANT.SPRING_CONFIG),
    }))

    const _flipNavBar = (shown = true) => {
        footerHeight.value = { height: (!shown ? 80 : 0) }
        navBarPosY.value = { bottom: (!shown ? 0 : -80) }
    }

    const _onPesanPress = () => {
        log('_onPesanPress : ')
        refModalProductList?.current?.toggle()
    }

    const _onPressFilter = () => {
        log('_onPressFilter : ')
        refModalFilterProduct?.current?.toggle()

    }

    useEffect(() => {
        log('Mount ProductsList');
        return () => {
            log('Unmount ProductsList')
        }
    }, [])
    return (
        <View style={styles.container}>
            <TitleBar
                title={params?.name || 'tak berjudul'}
                renderRight={() => <TouchableOpacity
                    activeOpacity={.8}
                    onPress={_onPressFilter}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Icon name={'filter'} size={26} color={colors.black} />
                </TouchableOpacity>}
            />
            <View style={{ backgroundColor: colors.white, flex: 1 }}>
                <FlatList
                    data={[0, 1, 2, 3, 4, 5, 6]}
                    renderItem={() => <CardProduct
                        onAdd={() => _flipNavBar(true)}
                        onRemove={() => _flipNavBar(false)}
                    />}
                    snapToInterval={150}
                    keyExtractor={(data) => data}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={<Animated.View style={footerHeightStyle} />}
                />
            </View>
            <Animated.View style={[navBarPosYStyle, { position: 'absolute', left: 0, height: 80, width: '100%', backgroundColor: colors.white, borderTopColor: colors.athensGray, borderTopWidth: 1, padding: 16, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }]}>
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                    <View>
                        <MyText left light>1 Pesanan</MyText>
                        <MyText left medium color={colors.black} style={{ width: 90 }} numberOfLines={1}>Rp80.0090</MyText>
                    </View>
                    <Icon name={'chevron-up'} size={30} style={{ alignSelf: 'center' }} color={colors.black} />
                </View>
                <View>
                    <InputItems.MyButton
                        onPress={_onPesanPress}
                        style={styles.button}
                        label={'pesan'}
                        labelStyle={{ fontSize: 16 }} />
                </View>
            </Animated.View>
            <ModalProductList ref={refModalProductList} navigation={navigation} />
            <ModalFilterProduct ref={refModalFilterProduct} navigation={navigation} />
        </View >
    )
})