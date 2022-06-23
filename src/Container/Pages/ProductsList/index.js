import { View, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, memo, useRef, useCallback } from 'react';
import { log, CONSTANT } from '@Utils';
import { useTheme } from 'react-native-paper';
import { TitleBar, InputItems } from '@Molecules';
import { MyText } from '@Atoms';
import { CardProduct, Forms } from '@Organisms';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import ModalProductList from './ModalProductList';
import ModalFilterProduct from './ModalFilterProduct';
import ModalDetailProduct from './ModalDetailProduct';
import styles from './styles';
import { UseMerchant } from '@ViewModel';

export default memo(({ navigation, route: { params } }) => {
    const { _getCategoryList, categoryList } = UseMerchant()
    const { colors } = useTheme();
    const refModalProductList = useRef(<ModalProductList />)
    const refModalFilterProduct = useRef(<ModalFilterProduct />)
    const refModalDetailProduct = useRef(<ModalDetailProduct />)
    const navBarPosY = useSharedValue({ bottom: -80 })
    const navBarPosYStyle = useAnimatedStyle(() => ({
        bottom: withSpring(navBarPosY.value.bottom, CONSTANT.SPRING_CONFIG),
    }))
    const footerHeight = useSharedValue({ height: 0 })
    const footerHeightStyle = useAnimatedStyle(() => ({
        height: withSpring(footerHeight.value.height, CONSTANT.SPRING_CONFIG),
    }))

    const _onChangeBucket = () => refModalDetailProduct?.current?.toggle('CHANGE');

    const _onBucketChanged = () => {
        footerHeight.value = { height: footerHeight.value == 0 ? 80 : 0 }
        navBarPosY.value = { bottom: navBarPosY.value.bottom == 0 ? -80 : 0 }
    }

    const _onDetailBucketPress = () => refModalDetailProduct?.current?.toggle('DETAIL');

    const _onAddNotes = (props) => {
        log('_onPesanPress : ', props)
        refModalProductList?.current?.toggle()
    }

    const _onPressFilter = () => {
        log('_onPressFilter : ')
        refModalFilterProduct?.current?.toggle()
    }

    const _filterProduct = (sortType, discount) => {
        log('_filterProduct : ', sortType, discount)
    }

    const _renderCardProduct = useCallback(({ item }) => <CardProduct onAdd={_onChangeBucket} onRemove={_onChangeBucket} addNotes={() => _onAddNotes(item)} />, [])

    useEffect(() => {
        log('Mount ProductsList');
        _getCategoryList(params);
        return () => {
            log('Unmount ProductsList')
        }
    }, [])

    return (
        <>
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
                    <Icon name={'filter-outline'} size={26} black />
                </TouchableOpacity>}
            />
            <View style={styles.container}>
                <View style={{ backgroundColor: colors.white, flex: 1 }}>
                    <FlatList
                        data={categoryList}
                        renderItem={_renderCardProduct}
                        snapToInterval={150}
                        keyExtractor={(data) => data}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                        ListFooterComponent={<Animated.View style={footerHeightStyle} />}
                    />
                </View>
                <Animated.View style={[navBarPosYStyle, { position: 'absolute', left: 0, height: 80, width: '100%', backgroundColor: colors.white, borderTopColor: colors.athensGray, borderTopWidth: 1, padding: 16, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }]}>
                    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        <View>
                            <MyText left light>1 Pesanan</MyText>
                            <MyText left medium black style={{ width: 90 }} numberOfLines={1}>Rp80.0090</MyText>
                        </View>
                        <Icon name={'chevron-up'} size={30} style={{ alignSelf: 'center' }} black onPress={_onDetailBucketPress} />
                    </View>
                    <View>
                        <InputItems.MyButton
                            style={styles.button}
                            label={'pesan'}
                            labelStyle={{ fontSize: 16 }} />
                    </View>
                </Animated.View>
                <ModalProductList ref={refModalProductList} navigation={navigation} />
                <ModalFilterProduct ref={refModalFilterProduct} onApplyFilter={_filterProduct} />
                <ModalDetailProduct ref={refModalDetailProduct} onChangeBucket={_onBucketChanged} />
            </View>
        </>
    )
})