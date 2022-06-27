import { UseTable } from '@ViewModel';
import { View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, memo, useRef } from 'react';
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
let searchState = false;
const { BASE_URL } = CONSTANT;
export default memo(({ navigation }) => {
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
    } = UseTable();
    const { colors } = useTheme();
    const refTextinputContainer = useRef(<View />)
    const refTextTitleContainer = useRef(<View />)
    const refMejaModals = useRef(<MejaModals />)
    const refMejaFilterModal = useRef(<MejaFilterModal />)
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
        setSelectedTable(props)
        refMejaModals.current?.toggle({ ...props, qr: { uri: qrURI } })
    }

    const _renderTilesMeja = ({ item }) => <TilesMeja seat={item} numColumns={2} onPress={setSelectedTable} _onPressQR={_onPressQR} selectedTable={selectedTable} />
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
                        (tableList.length > 0 && <View style={styles.sectionContainer}>
                            <MyText bold medium black left>Cek Mejamu disini</MyText>
                            <MyText left>Yuk, pilih lokasi mejamu sebelum penuh</MyText>
                        </View>
                        )}
                    contentContainerStyle={styles.flatListContent}
                    data={filteredTables.length > 0 ? filteredTables : tableList}
                    renderItem={_renderTilesMeja}
                    snapToInterval={130}
                    keyExtractor={({ id }) => id}
                    numColumns={2}
                    ListEmptyComponent={<MyText large bold black>Oops, Meja Penuh nih...!</MyText>}
                    ListFooterComponent={<View style={styles.separator} />}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                />
                ||
                <EmptySearchResult title={'Oops,'} subTitle={'Meja yang kamu cari sepertinya tidak tersedia'} />
            }
            <MejaModals ref={refMejaModals} />
            <MejaFilterModal
                ref={refMejaFilterModal}
                onApplyFilter={(_floor, _seat) => _searchTable(({ floor, seat }) => parseInt(_floor) == parseInt(floor) && parseInt(_seat) < parseInt(seat))}
                onReset={_clearFiltered} />
        </View >
    )
})
