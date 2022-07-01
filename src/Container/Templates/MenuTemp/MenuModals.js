import { View, Image, FlatList } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import { log } from '@Utils';
import { useTheme, List } from 'react-native-paper';
import { MyText, MySwitch, MyModal, MyImage } from '@Atoms';
import { TitleBar, InputItems } from '@Molecules';
import styles from './styles';
export default forwardRef((props, ref) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({})
    useImperativeHandle(ref, () => ({
        toggle,
    }));
    const toggle = useCallback((item) => {
        log('_toggle : ')
        setProduct(item)
        setModalVisible(prevState => !prevState);
    }, [product])
    const _onCloseModal = useCallback(() => {
        setModalVisible(prevState => !prevState);
    }, [modalVisible]);
    const _onCanceled = useCallback(() => {
        log('_onCanceled : ')
        setModalVisible(prevState => !prevState);
    }, [modalVisible])
    const _onPressListOption = useCallback((index, listIndex) => {
        let tmpListOption = { ...product.options[index].list[listIndex] }
        let tmpOption = { ...product }
        tmpListOption = { ...tmpListOption, available: !tmpListOption.available }
        tmpOption.options[index].list[listIndex] = tmpListOption;
        setProduct(tmpOption)
    }, [product])
    const renderSectionOptions = ({ item, index }) => {
        return <>
            <View style={styles.sectionStatus}>
                <MyText left center bold black>Status</MyText>
            </View>
            <View style={styles.sectionStatus}>
                <MyText left center bold black>{item.name}</MyText>
            </View>
            {item.list.map(({ name, price, available }, listIndex) =>
                <View key={`key-list-${name}`} style={styles.sectionVariant}>
                    <View>
                        <MyText left black>{name} {listIndex}</MyText>
                        <MyText left light black>Rp.{price}</MyText>
                    </View>
                    <MySwitch value={available} onChange={() => _onPressListOption(index, listIndex)} />
                </View>)}
        </>
    }

    const _onSave = useCallback(() => {
        setLoading(true)
        setLoading(false)
        setModalVisible(prevState => !prevState);
        props?.onSave(product)
    }, [modalVisible, loading])
    return (
        <MyModal
            visible={modalVisible}
            onRequestClose={_onCloseModal}>
            <TitleBar
                customLeftPress={_onCloseModal}
                title={'Edit Menu'} />
            <FlatList
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.modalContainer}
                ListHeaderComponent={<>
                    <View style={styles.imageWrapper}>
                        <MyImage source={{ uri: product?.image?.url }} resizeMode={'contain'} height={200} width={'100%'} />
                    </View>
                    <View style={styles.description}>
                        <MyText left medium bold black>{product?.name}</MyText>
                        <MyText left black>Rp.{product.price}</MyText>
                        <MyText left light numberOfLines={2}>{product?.description}</MyText>
                    </View>
                </>}
                contentContainerStyle={{}}
                data={product?.options}
                renderItem={renderSectionOptions}
                snapToInterval={150}
                keyExtractor={({ name }) => name} />
            <View style={styles.buttonsContainer}>
                <InputItems.MyButton
                    secondary
                    onPress={_onCanceled}
                    style={styles.button}
                    label={'Batal'} />
                <InputItems.MyButton
                    loading={loading}
                    onPress={_onSave}
                    style={styles.button}
                    label={'Simpan'} />
            </View>
        </MyModal>
    )
})
