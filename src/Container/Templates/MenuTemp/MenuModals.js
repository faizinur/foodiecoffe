import { View, Image, ScrollView, FlatList } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import { log } from '@Utils';
import { useTheme, List } from 'react-native-paper';
import { MyText, MySwitch, MyModal } from '@Atoms';
import { TitleBar, InputItems } from '@Molecules';
import styles from './styles';
import { IC_PRODUCT_BIG } from '@Atoms/Icons';
export default forwardRef((props, ref) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState(false)
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
    const renderSectionOptions = ({ item }) => {
        return <>
            <View style={styles.sectionStatus}>
                <MyText left center bold black>Status</MyText>
                <MySwitch />
            </View>
            <View style={styles.sectionStatus}>
                <MyText left center bold black>{item.name}</MyText>
            </View>
            {item.list.map(({ name, price }) =>
                <View key={`key-list-${name}`} style={styles.sectionVariant}>
                    <View>
                        <MyText left black>{name}</MyText>
                        <MyText left light black>Rp.{price}</MyText>
                    </View>
                    <MySwitch />
                </View>)}
        </>
    }

    const _onSave = useCallback(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setModalVisible(prevState => !prevState);
            props?.onSave()
        }, 1500)
    }, [modalVisible, loading])
    return (
        <MyModal
            visible={modalVisible}
            onRequestClose={_onCloseModal}        // contentContainerStyle={styles.contentContainerStyle}
        >
            <TitleBar
                customLeftPress={_onCloseModal}
                title={'Edit Menu'} />

            <FlatList
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.modalContainer}
                ListHeaderComponent={<>
                    <Image source={{ uri: product?.image?.url }} resizeMode={'contain'} style={styles.imgBadge} />
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
