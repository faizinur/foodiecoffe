import { View, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, memo, useCallback, useRef } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { TitleBar } from '@Molecules';
import { CardMenu } from '@Organisms';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import MenuModals from './MenuModals';
import MenuModalSuccess from './MenuModalSuccess';
import { UseProduct } from '@ViewModel';
import { MyText } from '@Atoms';
export default memo(() => {
    const {
        productError,
        loadingProduct,
        productList,
        _getDaftarProduct,
        _onRefreshProduct,
        _setProductavalability,
    } = UseProduct();
    const { colors } = useTheme();
    const refMenuModals = useRef(<MenuModals />)
    const refMenuModalSuccess = useRef(<MenuModalSuccess />)
    const _onClickSetting = () => {
        log('_onClickSetting : ')
    }

    const MyPressableIcon = (props) => (<TouchableOpacity
        activeOpacity={.8}
        onPress={props.onClickSearch}
        style={styles.pressableIcon}>
        <Icon name={props.iconName} size={26} black />
    </TouchableOpacity>)

    const _renderCardMenu = ({ item }) => <CardMenu item={item} onPress={refMenuModals.current?.toggle} />

    const _onSave = async product => {
        await _setProductavalability(product)
        refMenuModalSuccess.current?.toggle()
    }
    useEffect(() => {
        log('Mount MenuTemp');
        _getDaftarProduct();
        return () => {
            log('Unmount MenuTemp')
        }
    }, [])
    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: colors.white }}>
            <TitleBar
                disabledLeft={true}
                title={'Daftar Menu'}
                renderRight={() => <MyPressableIcon onClickSearch={_onClickSetting} iconName={'filter-outline'} />} />
            <View style={{ paddingHorizontal: '5%' }}>

                {productError == '' && <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={loadingProduct}
                            onRefresh={_onRefreshProduct}
                        />}
                    contentContainerStyle={styles.contentContainerStyle}
                    data={productList}
                    renderItem={_renderCardMenu}
                    snapToInterval={150}
                    keyExtractor={({ id }) => id}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => <MyText>Product Kosong</MyText>}
                /> || <MyText>productError {productError}</MyText>}
            </View>
            <MenuModals ref={refMenuModals} onSave={_onSave} />
            <MenuModalSuccess ref={refMenuModalSuccess} />
        </View>
    )
})