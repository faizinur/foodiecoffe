import { View, FlatList, } from 'react-native';
import React, { useEffect, useCallback, memo } from 'react';
import { log } from '@Utils';
import { useTheme, TextInput, Searchbar } from 'react-native-paper';
import { MyText } from '@Atoms';
import { TilesCategory } from '@Organisms';
import { EmptySearchResult } from '@Molecules';
import { UseMerchant } from '@ViewModel';
import styles from './styles';
export default memo(({ onSelectCategory }) => {
    const { colors } = useTheme();
    const {
        _getMerchant,
        merchantList,
        merchantLoading,
        merchantError,
        searchQuery,
        setSearchQuery,
        _filterCategory,
        filteredCategory,
        _clearFilteredCategory,
    } = UseMerchant()

    const _renderTilesCategory = ({ item }) => <TilesCategory merchant={item} numColumns={3} onPress={onSelectCategory} />

    useEffect(() => {
        log('Mount MerchantTemp');
        _getMerchant()
        return () => {
            log('Unmount MerchantTemp')
        }
    }, [])
    return (
        <View style={styles.contentContainerStyle}>
            <View style={styles.drawerIndicator} />
            <View style={styles.sectionContainer}>
                <View style={{ paddingTop: 24, paddingBottom: 32 }}>
                    <Searchbar
                        placeholder="Main Course, Drinks, Combo..."
                        onChangeText={setSearchQuery}
                        onSubmitEditing={_filterCategory}
                        value={searchQuery}
                        inputStyle={{ fontSize: 12, fontFamily: 'ReadexProLight', color: colors.cerulean, paddingTop: 10, }}
                        iconColor={colors.cerulean}
                        maxLength={30}
                        clearIcon={() => <TextInput.Icon
                            style={{ position: 'absolute', top: -20, left: -20 }}
                            name={'close'}
                            onPress={_clearFilteredCategory}
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
                    data={merchantLoading ? [] : (filteredCategory.length > 0 ? filteredCategory : merchantList)}
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
        </View>
    )
})