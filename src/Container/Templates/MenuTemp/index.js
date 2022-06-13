import { View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, memo, useCallback, useRef } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { TitleBar, PendingModals } from '@Molecules';
import { CardMenu } from '@Organisms';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import MenuModals from './MenuModals';
import { UseProductVM } from '@ViewModel';
import { MyText } from '@Atoms';
export default memo(({ navigation }) => {
    const {
        error,
        loading,
        productList,
        _getDaftarProduct,
    } = UseProductVM();
    const { colors } = useTheme();
    const refMenuModals = useRef(<MenuModals />)
    const refPendingModals = useRef(<PendingModals />)
    const _onClickSetting = () => {
        log('_onClickSetting : ')
    }

    const MyPressableIcon = (props) => (<TouchableOpacity
        activeOpacity={.8}
        onPress={props.onClickSearch}
        style={styles.pressableIcon}>
        <Icon name={props.iconName} size={26} color={colors.black} />
    </TouchableOpacity>)

    const _onMenuPress = useCallback(() => {
        log('_onMenuPress : ')
        // refMenuModals.current?.toggle({})
        refPendingModals.current?.toggle();
    }, [])
    const renderCardMenu = ({ item }) => <CardMenu {...item} onPress={_onMenuPress} />
    const _getProduct = async () => await _getDaftarProduct()

    useEffect(() => {
        log('Mount MenuTemp');
        _getProduct();
        return () => {
            log('Unmount MenuTemp')
        }
    }, [])
    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: colors.white }}>
            <TitleBar
                disabledLeft={true}
                title={'Daftar Menu'}
                renderRight={() => <MyPressableIcon onClickSearch={_onClickSetting} iconName={'cog'} />} />
            <View style={{ paddingHorizontal: '5%' }}>
                <FlatList
                    contentContainerStyle={styles.contentContainerStyle}
                    data={loading ? [] : productList}
                    renderItem={renderCardMenu}
                    snapToInterval={150}
                    keyExtractor={({ id }) => id}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => <MyText >Product Kosong</MyText>}
                />
            </View>
            <MenuModals ref={refMenuModals} />
            <PendingModals ref={refPendingModals} />
        </View>
    )
})