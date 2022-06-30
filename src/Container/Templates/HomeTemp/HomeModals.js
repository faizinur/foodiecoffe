import { View, FlatList, } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, memo } from 'react';
import { log } from '@Utils';
import { useTheme, TextInput, Searchbar } from 'react-native-paper';
import { MyText, MyModal } from '@Atoms';
import { TilesCategory } from '@Organisms';
import { EmptySearchResult } from '@Molecules';
import styles from './styles';
export default memo(forwardRef(({ navigation: { navigate }, merchantList, loading, merchantError, searchQuery, setSearchQuery, filterCategory, filteredCategory, clearFilteredCategory }, ref) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        toggle,
    }));
    const toggle = useCallback(() => {
        log('_toggle : ');
        setModalVisible(prevState => !prevState);
    }, [modalVisible])
    const _onCloseModal = useCallback(() => {
        setModalVisible(prevState => !prevState);
    }, [modalVisible]);
    const _onPressCategory = useCallback(merchant => {
        setModalVisible(prevState => !prevState);
        navigate('ProductsList', merchant)
    }, [modalVisible])
    const _renderTilesCategory = ({ item }) => <TilesCategory merchant={item} numColumns={3} onPress={_onPressCategory} />
    // log('NAH KAN HomeTemp DE RELOAD!!>>>>>>')
    return (
        <MyModal
            visible={modalVisible}
            onRequestClose={_onCloseModal}
            statusBarTranslucent={true}
            contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.drawerIndicator} />
            <View style={styles.sectionContainer}>
                <View style={{ paddingTop: 24, paddingBottom: 32 }}>
                    {/* <InputItems.MyTextInput placeholder={'Kamu mau pesan apa?'} value={text} onChangeText={setText} returnKeyType='search' onResetField={() => setText('')} /> */}
                    <Searchbar
                        placeholder="Search"
                        onChangeText={setSearchQuery}
                        onSubmitEditing={filterCategory}
                        value={searchQuery}
                        inputStyle={{ fontSize: 12, fontFamily: 'ReadexProLight', color: colors.cerulean, paddingTop: 10, }}
                        iconColor={colors.cerulean}
                        maxLength={30}
                        clearIcon={() => <TextInput.Icon
                            style={{ position: 'absolute', top: -20, left: -20 }}
                            name={'close'}
                            onPress={clearFilteredCategory}
                            size={20}
                            color={colors.cerulean} />}
                    />
                </View>
                {merchantError != 'MERCHANT_NOT_FOUND' && <>
                    <MyText bold medium black left>Aneka Kuliner</MyText>
                    <MyText left>Yuk cari makanan atau minuman buat hari ini</MyText>
                </>}
            </View>
            {merchantError != 'MERCHANT_NOT_FOUND' &&
                <FlatList
                    contentContainerStyle={{ marginTop: 20 }}
                    data={loading ? [] : (filteredCategory.length > 0 ? filteredCategory : merchantList)}
                    renderItem={_renderTilesCategory}
                    snapToInterval={150}
                    keyExtractor={({ id }) => id}
                    numColumns={3}
                    ListEmptyComponent={<MyText large bold black>Oops, Kategori Masih kosong nih...!</MyText>}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                />
                ||
                <EmptySearchResult title={'Oops,'} subTitle={'Menu yang kamu cari sepertinya tidak tersedia, yuk coba cari yang lain'} />
            }
        </MyModal>
    )
}))