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
import { ListMeja as DataMeja } from '@Data';
let searchState = false;
export default memo(({ navigation }) => {
    const { colors } = useTheme();
    const refTextinput = useRef(<View />)
    const refTextTitle = useRef(<View />)
    const refMejaModals = useRef(<MejaModals />)
    const [listMeja, setListMeja] = useState([]);
    const _onClickSearch = () => {
        searchState = !searchState;
        Promise.all([
            refTextinput.current?.setNativeProps({ style: { display: searchState == true ? 'flex' : 'none' } }),
            refTextTitle.current?.setNativeProps({ style: { display: searchState == true ? 'none' : 'flex' } })
        ])
    }
    const _onSubmitEditing = useCallback(({ nativeEvent: { text } }) => {
        alert(`CARI ::: ${text}`)
    }, [])
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
        refMejaModals.current?.toggle(props)
    }, [])
    const _onMout = useCallback(() => {
        log('_onMout MejaTemp');
        setListMeja(DataMeja.sort((prev, next) => prev.available != false));
    }, [listMeja])
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
            <FlatList
                style={styles.flatList}
                ListHeaderComponent={
                    (listMeja.length > 0 && <View style={styles.sectionContainer}>
                        <MyText bold medium color={colors.black} left>Cek Mejamu disini</MyText>
                        <MyText left>Yuk, pilih lokasi mejamu sebelum penuh</MyText>
                    </View>
                    )}
                contentContainerStyle={styles.flatListContent}
                data={listMeja}
                renderItem={({ item }) => <CardMeja {...item} numColumns={2} onPress={_onPressMeja} />}
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
