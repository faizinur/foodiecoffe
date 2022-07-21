import { View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
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
    const { _getCategoryList, categoryList, merchantLoading, setMerchantLoading, setcategoryList, _onBucketChanged } = UseMerchant()
    const { colors } = useTheme();
    const refModalProductList = useRef(<ModalProductList />)
    const refModalFilterProduct = useRef(<ModalFilterProduct />)
    const refModalDetailProduct = useRef(<ModalDetailProduct />)
    const navBarPosY = useSharedValue({ bottom: -80 })
    const navBarPosYStyle = useAnimatedStyle(() => ({
        bottom: withSpring(categoryList.filter(({ count }) => count > 0).length > 0 ? 0 : navBarPosY.value.bottom, CONSTANT.SPRING_CONFIG),
    }))
    const footerHeight = useSharedValue({ height: 0 })
    const footerHeightStyle = useAnimatedStyle(() => ({
        height: withSpring(categoryList.filter(({ count }) => count > 0).length > 0 ? 80 : footerHeight.value.height, CONSTANT.SPRING_CONFIG),
    }))

    const _onChangeBucket = (type, product) => refModalDetailProduct?.current?.toggle(type, product)


    const _onDetailBucketPress = () => refModalDetailProduct?.current?.toggle('DETAIL');

    const _onAddNotes = (product) => {
        log('_onPesanPress addons : ')
        refModalProductList?.current?.toggle(product)
    }

    const _onPressFilter = () => {
        log('_onPressFilter : ')
        refModalFilterProduct?.current?.toggle()
    }

    const _filterProduct = (sortType, discount) => {
        log('_filterProduct : ', sortType, discount)
    }

    const _renderCardProduct = useCallback(({ item }) => <CardProduct item={item} onAdd={() => _onChangeBucket('CHANGE', item)} onRemove={() => _onChangeBucket('CHANGE', item)} addNotes={() => _onAddNotes(item)} />, [])

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
                    {/* <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={merchantLoading}
                                onRefresh={() => {
                                    _getCategoryList(params);
                                    setMerchantLoading(true);
                                    setTimeout(() => setMerchantLoading(false), 3000);
                                }}
                            />}
                        data={categoryList}
                        renderItem={_renderCardProduct}
                        snapToInterval={150}
                        keyExtractor={({ productId }) => productId}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                        ListEmptyComponent={<MyText large bold black>Oops, Kategori Masih kosong nih...!</MyText>}
                        ListFooterComponent={<Animated.View style={footerHeightStyle} />}
                    /> */}
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
                <ModalProductList ref={refModalProductList} navigation={navigation} onChangeBucket={_onBucketChanged} />
                <ModalFilterProduct ref={refModalFilterProduct} onApplyFilter={_filterProduct} />
                <ModalDetailProduct ref={refModalDetailProduct} onChangeBucket={_onBucketChanged} />
            </View>
        </>
    )
})