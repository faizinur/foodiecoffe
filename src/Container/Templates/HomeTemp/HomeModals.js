import { View, FlatList } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, } from 'react';
import { log } from '@Utils';
import { useTheme, } from 'react-native-paper';
import { MyText, MyModal } from '@Atoms';
import { InputItems } from '@Molecules';
import { CardCategory } from '@Organisms';
import { ListCategory } from '@Data'
import styles from './styles';
export default forwardRef((props, ref) => {
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
    const _onPressCategory = useCallback((props) => {
        log('_onPressCategory : ')
    }, [])
    const _renderCardCategory = ({ item }) => <CardCategory {...item} numColumns={3} onPress={_onPressCategory} />
    return (
        <MyModal
            visible={modalVisible}
            onRequestClose={_onCloseModal}
            statusBarTranslucent={true}
            contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.drawerIndicator} />
            <FlatList
                ListHeaderComponent={<View style={styles.sectionContainer}>
                    <View style={{ paddingVertical: 10 }}>
                        <InputItems.MyTextInput placeholder={'Kamu mau pesan apa?'} />
                    </View>
                    <MyText bold medium color={colors.black} left>Aneka Kuliner</MyText>
                    <MyText left>Yuk cari makanan atau minuman buat hari ini</MyText>
                </View>}
                data={ListCategory}
                renderItem={_renderCardCategory}
                snapToInterval={150}
                keyExtractor={({ id }) => id}
                numColumns={3}
                ListEmptyComponent={<MyText large bold color={colors.black}>Oops, Kategori kosong nih...!</MyText>}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
            />
        </MyModal>
    )
})