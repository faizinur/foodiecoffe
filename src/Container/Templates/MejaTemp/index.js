import { UseTable } from '@ViewModel';
import { View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, memo, useRef, useCallback, useState } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import { TitleBar, InputItems } from '@Molecules';
import { CardMeja } from '@Organisms';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MejaModals from './MejaModals';
let searchState = false;
export default memo(({ navigation }) => {
    const { _getTables, tableList, tableError, refreshingTable, selectedTable, setSelectedTable, setFilteredTables, filteredTables, } = UseTable();
    const { colors } = useTheme();
    const refTextinput = useRef(<View />)
    const refTextTitle = useRef(<View />)
    const refMejaModals = useRef(<MejaModals />)
    const _onClickSearch = () => {
        searchState = !searchState;
        Promise.all([
            refTextinput.current?.setNativeProps({ style: { display: searchState == true ? 'flex' : 'none' } }),
            refTextTitle.current?.setNativeProps({ style: { display: searchState == true ? 'none' : 'flex' } })
        ])
    }
    const _onSubmitEditing = useCallback(({ nativeEvent: { text } }) => {
        // if (text.length < 2) return false;
        let filtered = tableList.filter(({ number }) => (number == selectedTable.number));
        log(filtered)
        setFilteredTables(filtered)
    }, [tableList, filteredTables, selectedTable])
    const _onClickSetting = () => {
        log('_onClickSetting : ')
    }
    const MyPressableIcon = (props) => (<TouchableOpacity
        activeOpacity={.8}
        onPress={props.onClickSearch}
        style={styles.pressableIcon}>
        <Icon name={props.iconName} size={26} color={colors.black} />
    </TouchableOpacity>)

    const _onPressMeja = useCallback((props) => {
        setSelectedTable(props)
    }, [])
    const _onPressQR = props => {
        setSelectedTable(props)
        refMejaModals.current?.toggle(props.qr)
    }
    const _onMout = useCallback(() => {
        log('_onMout MejaTemp');
        _getTables()
    }, [])
    useEffect(() => {
        log('Mount MejaTemp');
        _onMout();
        return () => {
            log('Unmount MejaTemp')
        }
    }, [])
    return (
        <View style={styles.pages}>
            <TitleBar
                disabledLeft={true}
                renderTitle={() => <>
                    <View ref={refTextinput} style={styles.renderTitleWrappwe('none')}>
                        <InputItems.MyTitleBarInput onSubmitEditing={_onSubmitEditing} />
                        <MyPressableIcon onClickSearch={_onClickSearch} iconName={'close'} />
                    </View>
                    <View ref={refTextTitle} style={styles.renderTitleWrappwe('flex')}>
                        <MyText center color={colors.black} style={{ textTransform: 'capitalize' }}>pilih meja</MyText>
                        <MyPressableIcon onClickSearch={_onClickSearch} iconName={'search-web'} />
                    </View>
                </>}
                renderRight={() => <MyPressableIcon onClickSearch={_onClickSetting} iconName={'cog'} />}
            />
            <MyText left> filteredTables FILTER TABLE ERRO! {JSON.stringify(filteredTables)}</MyText>
            <FlatList
                style={styles.flatList}
                ListHeaderComponent={
                    (tableList.length > 0 && <View style={styles.sectionContainer}>
                        <MyText bold medium color={colors.black} left>Cek Mejamu disini</MyText>
                        <MyText left>Yuk, pilih lokasi mejamu sebelum penuh</MyText>
                    </View>
                    )}
                contentContainerStyle={styles.flatListContent}
                data={tableList}
                renderItem={({ item }) => <CardMeja {...item} numColumns={2} onPress={_onPressMeja} _onPressQR={_onPressQR} selectedTable={selectedTable} />}
                snapToInterval={130}
                keyExtractor={({ id }) => id}
                numColumns={2}
                ListEmptyComponent={<MyText large bold color={colors.black}>Oops, Meja Penuh nih...!</MyText>}
                ListFooterComponent={<View style={styles.separator} />}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
            />
            <MejaModals ref={refMejaModals} />
        </View >
    )
})
