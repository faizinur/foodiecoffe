import { View, Image, ScrollView } from 'react-native';
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
    useImperativeHandle(ref, () => ({
        toggle,
    }));
    const toggle = useCallback(() => {
        log('_toggle : ')
        setModalVisible(prevState => !prevState);
    }, [])
    const _onCloseModal = useCallback(() => {
        setModalVisible(prevState => !prevState);
    }, [modalVisible]);
    return (
        <MyModal
            visible={modalVisible}
            onRequestClose={_onCloseModal}        // contentContainerStyle={styles.contentContainerStyle}
        >
            <TitleBar
                customLeftPress={_onCloseModal}
                title={'Edit Menu'} />
            <ScrollView
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.modalContainer}>
                <Image source={IC_PRODUCT_BIG} style={styles.imgBadge} />
                <View style={styles.description}>
                    <MyText left medium bold color={colors.black}>Caramel Macchiato</MyText>
                    <MyText left color={colors.black}>Rp.60.250</MyText>
                    <MyText left light numberOfLines={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames interdum diam. </MyText>
                </View>
                <View style={styles.sectionStatus}>
                    <MyText left center bold color={colors.black}>Status</MyText>
                    <MySwitch />
                </View>
                <MyText left bold color={colors.black} style={styles.titleVariant}>Varian Ukuran</MyText>
                <View style={styles.sectionVariant}>
                    <MyText left center light color={colors.black}>Kecil</MyText><MySwitch />
                </View>
                <View style={styles.sectionVariant}>
                    <MyText left light color={colors.black}>Sedang</MyText><MySwitch />
                </View>
                <View style={styles.sectionVariant}>
                    <MyText left center light color={colors.black}>Besar</MyText><MySwitch />
                </View>
                <MyText left bold color={colors.black} style={styles.titleVariant}>Varian Topping</MyText>
                <View style={styles.sectionVariant}>
                    <MyText left center light color={colors.black}>Extra Cocout Jelly</MyText><MySwitch />
                </View>
                <View style={styles.sectionVariant}>
                    <MyText left center light color={colors.black}>Extra Sugar Syrup</MyText><MySwitch />
                </View>
                <View style={styles.sectionVariant}>
                    <MyText left center light color={colors.black}>Extra Expresso Shot</MyText><MySwitch />
                </View>
                <View style={styles.sectionVariant}>
                    <MyText left center light color={colors.black}>Extra Grass Jelly</MyText><MySwitch />
                </View>
                <View style={styles.sectionVariant}>
                    <MyText left center light color={colors.black}>Extra Oreo</MyText><MySwitch />
                </View>
            </ScrollView>
            <View style={styles.buttonsContainer}>
                <InputItems.MyButton
                    secondary
                    style={styles.button}
                    label={'Batal'} />
                <InputItems.MyButton
                    style={styles.button}
                    label={'Simpan'} />
            </View>
        </MyModal>
    )
})
