import { View, FlatList } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, memo } from 'react';
import { log } from '@Utils';
import { useTheme, } from 'react-native-paper';
import { MyText, MyModal } from '@Atoms';
import { InputItems } from '@Molecules';
import { CardCategory } from '@Organisms';
import styles from './styles';
import { UseMerchant } from '@ViewModel'
export default memo(forwardRef((props, ref) => {
    const {
        _getMerchant,
        merchantList,
        loading,
        merchantError,
    } = UseMerchant()
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    useImperativeHandle(ref, () => ({
        toggle,
    }));
    const toggle = useCallback(() => {
        log('_toggle : ')
        setModalVisible(prevState => !prevState);
    }, [modalVisible])
    const _onCloseModal = useCallback(() => {
        setModalVisible(prevState => !prevState);
    }, [modalVisible]);
    const _onPressCategory = useCallback(merchant => {
        log('_onPressCategory : ', merchant)
    }, [])
    const _renderCardCategory = ({ item }) => <CardCategory merchant={item} numColumns={3} onPress={_onPressCategory} />
    log('NAH KAN HomeTemp DE RELOAD!!>>>>>>')
    return (
        <MyModal
            visible={modalVisible}
            onRequestClose={_onCloseModal}
            statusBarTranslucent={true}
            onShow={_getMerchant}
            contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.drawerIndicator} />
            <View style={styles.sectionContainer}>
                <View style={{ paddingVertical: 10 }}>
                    <InputItems.MyTextInput placeholder={'Kamu mau pesan apa?'} />
                </View>
                <MyText bold medium color={colors.black} left>Aneka Kuliner</MyText>
                <MyText left>Yuk cari makanan atau minuman buat hari ini</MyText>
            </View>
            <FlatList
                data={loading ? [] : merchantList}
                renderItem={_renderCardCategory}
                snapToInterval={150}
                keyExtractor={({ id }) => id}
                numColumns={3}
                ListEmptyComponent={<MyText large bold color={colors.black}>Oops, Kategori Masih kosong nih...!</MyText>}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
            />
        </MyModal>
    )
}))