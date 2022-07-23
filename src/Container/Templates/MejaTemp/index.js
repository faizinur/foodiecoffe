import { UseTable } from '@ViewModel';
import { View, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, memo, useRef, useCallback } from 'react';
import { log, CONSTANT } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import { TitleBar, InputItems, EmptySearchResult } from '@Molecules';
import { TilesMeja } from '@Organisms';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MejaModals from './MejaModals';
import MejaFilterModal from './MejaFilterModal';
import { UseAuth } from '@ViewModel';
import Animated, { useAnimatedStyle, withTiming, } from 'react-native-reanimated';
let searchState = false;
const { BASE_URL } = CONSTANT;
export default memo(({ onChooseMeja = null }) => {
    const { _getUserData } = UseAuth();
    const {
        _getTables,
        tableList,
        selectedTable,
        setSelectedTable,
        _searchTable,
        filteredTables,
        _clearFiltered,
        _onChangeText,
        searchValue,
        tableError,
        refreshingTable,
        setRefreshingTable,
    } = UseTable();
    const { colors } = useTheme();
    const refTextinputContainer = useRef(<View />)
    const refTextTitleContainer = useRef(<View />)
    const refMejaModals = useRef(<MejaModals />)
    const refMejaFilterModal = useRef(<MejaFilterModal />)

    const navbarButtonStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: withTiming(Object.keys(selectedTable).length > 0 ? 0 : 80, { duration: 100 }) }]
    }))

    const _onClickSearch = () => {
        if (searchState) _clearFiltered()
        searchState = !searchState;
        refTextinputContainer.current?.setNativeProps({ style: { display: searchState == true ? 'flex' : 'none' } })
        refTextTitleContainer.current?.setNativeProps({ style: { display: searchState == true ? 'none' : 'flex' } })
    }
    const _onClickSetting = () => {
        log('_onClickSetting : ')
        refMejaFilterModal.current?.toggle()
    }
    const MyPressableIcon = (props) => (<TouchableOpacity
        activeOpacity={.8}
        onPress={props.onClickSearch}
        style={styles.pressableIcon}>
        <Icon name={props.iconName} size={26} black />
    </TouchableOpacity>)


    const _onPressQR = async props => {
        const { user: { merchantId } } = await _getUserData()
        const qrURI = `${BASE_URL}${merchantId || 'B1778H'}/qr/${props.qr.name}`;
        refMejaModals.current?.toggle({ ...props, qr: { uri: qrURI } })
    }

    const _selectTable = useCallback(meja => {
        if (selectedTable?.id == meja?.id) {
            setSelectedTable({})
        } else {
            setSelectedTable(meja)
        }
        log(selectedTable?.id)
    }, [selectedTable])

    const _onPilihMejaPress = useCallback(() => onChooseMeja(selectedTable), [selectedTable])

    const _renderTilesMeja = ({ item }) => <TilesMeja seat={item} numColumns={2}
        onPress={seat => {
            if (onChooseMeja == null) {
                _onPressQR(seat)
            } else {
                _selectTable(seat)
            }
        }}
        selectedTable={selectedTable} />
    useEffect(() => {
        log('Mount MejaTemp');
        _getTables();
        return () => {
            log('Unmount MejaTemp')
        }
    }, [filteredTables])
    return (
        <View style={styles.pages}>
            <TitleBar
                disabledLeft={true}
                renderTitle={() => <>
                    <View ref={refTextinputContainer} style={styles.renderTitleWrappwe('none')}>
                        <InputItems.MyTitleBarInput
                            value={searchValue}
                            onChangeText={_onChangeText}
                            onSubmitEditing={({ nativeEvent: { text } }) => _searchTable(({ number }) => number.toLowerCase().includes(text.toLowerCase()))}
                        />
                        <MyPressableIcon onClickSearch={_onClickSearch} iconName={'close'} />
                    </View>
                    <View ref={refTextTitleContainer} style={styles.renderTitleWrappwe('flex')}>
                        <MyText center black style={{ textTransform: 'capitalize' }}>pilih meja</MyText>
                        <MyPressableIcon onClickSearch={_onClickSearch} iconName={'search-web'} />
                    </View>
                </>}
                renderRight={() => <MyPressableIcon onClickSearch={_onClickSetting} iconName={'filter-outline'} />}
            />
            {tableError != 'MEJA_NOT_FOUND' &&
                <FlatList
                    style={styles.flatList}
                    ListHeaderComponent={
                        (tableList.length > 0 && <View style={styles.jumbotron}>
                            <MyText bold medium black left>Cek Mejamu disini</MyText>
                            <MyText left>Yuk, pilih lokasi mejamu sebelum penuh</MyText>
                        </View>
                        )}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshingTable}
                            onRefresh={() => {
                                _getTables();
                                setRefreshingTable(true);
                                setTimeout(() => setRefreshingTable(false), 3000);
                            }}
                        />}
                    contentContainerStyle={styles.flatListContent}
                    data={filteredTables.length > 0 ? filteredTables : tableList}
                    renderItem={_renderTilesMeja}
                    snapToInterval={130}
                    keyExtractor={({ id }) => id}
                    numColumns={2}
                    ListEmptyComponent={tableList.length > 0 && tableError == '' ? <MyText large bold black>Oops, Meja Penuh nih...!</MyText> : <MyText large bold black>Tunggu ya...!</MyText>}
                    ListFooterComponent={<View style={styles.separator} />}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                />
                ||
                <EmptySearchResult title={'Oops,'} subTitle={'Meja yang kamu cari sepertinya tidak tersedia'} />
            }
            <Animated.View style={[navbarButtonStyle, { width: '100%', paddingHorizontal: '5%', paddingVertical: 5, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: colors.white, borderTopColor: colors.athensGray, borderTopWidth: 1 }]}>
                <InputItems.MyButton
                    secondary
                    onPress={() => _selectTable(selectedTable)}
                    style={{ width: '48%' }}
                    label={'Batal'}
                    labelStyle={{ fontSize: 14 }} />
                <InputItems.MyButton
                    onPress={_onPilihMejaPress}
                    style={{ width: '48%' }}
                    label={'Pilih Menu'}
                    labelStyle={{ fontSize: 14 }} />
            </Animated.View>
            <MejaModals ref={refMejaModals} />
            <MejaFilterModal
                ref={refMejaFilterModal}
                onApplyFilter={(_floor, _seat) => _searchTable(({ floor, seat }) => parseInt(_floor) == parseInt(floor) && parseInt(_seat) < parseInt(seat))}
                onReset={_clearFiltered} />
        </View >
    )
})
