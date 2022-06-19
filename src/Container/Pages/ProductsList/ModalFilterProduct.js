import { View, FlatList, ScrollView, StatusBar } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, memo } from 'react';
import { log } from '@Utils';
import { useTheme, RadioButton, Chip } from 'react-native-paper';
import { MyText, MyModal } from '@Atoms';
import { InputItems } from '@Molecules';
import styles, { height } from './styles';
export default memo(forwardRef((props, ref) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [sortType, setSortType] = useState(''); //MATCH, CHEAP, EXPENSIVE
    const [discount, setDicount] = useState(''); //FOOD, FREE_SHIPPING 
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
    const _resetFilter = useCallback(() => {
        setSortType('')
        setDicount('')
    }, [sortType, discount])
    const _onApplyFilter = useCallback(() => {
        props?.onApplyFilter(sortType, discount)
    }, [sortType, discount])
    return (
        <MyModal
            visible={modalVisible}
            onRequestClose={_onCloseModal}
            statusBarTranslucent={true}
            contentContainerStyle={styles.filterContainerStyle}>
            <View style={{ width: '100%', position: 'absolute', bottom: 0, left: 0, backgroundColor: colors.white, paddingHorizontal: '5%', paddingTop: '5%', borderTopLeftRadius: 15, borderTopRightRadius: 15, }}>
                <ScrollView
                    style={{ maxHeight: height * .755, minHeight: 180 }}
                    showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, height: 30 }}>
                        <MyText bold medium color={colors.black}>Filter Menu</MyText>
                        {(sortType != '' || discount != '') && <MyText bold color={colors.wildWaterMelon} onPress={_resetFilter} >Reset</MyText>}
                    </View>
                    <MyText left bold color={colors.black} style={{ marginVertical: 12 }}>Urutkan</MyText>
                    <RadioButton.Group onValueChange={setSortType} value={sortType}>
                        <RadioButton.Item label="Paling sesuai" value="MATCH" labelStyle={{ marginHorizontal: -17 }} color={colors.cerulean} />
                        <RadioButton.Item label="Paling murah" value="CHEAP" labelStyle={{ marginHorizontal: -17 }} color={colors.cerulean} />
                        <RadioButton.Item label="Paling mahal" value="EXPENSIVE" labelStyle={{ marginHorizontal: -17 }} color={colors.cerulean} />
                    </RadioButton.Group>
                    <MyText left bold color={colors.black} style={{ marginVertical: 12 }}>Diskon</MyText>
                    <View style={{ flexDirection: 'row', marginBottom: 50 }}>
                        <Chip onPress={() => setDicount(prevState => (prevState == 'FOOD' ? null : 'FOOD'))} selected={discount == 'FOOD'} selectedColor={discount == 'FOOD' ? colors.cerulean : colors.jumbo} style={{ marginHorizontal: 5, borderWidth: 1, backgroundColor: colors.white, borderColor: discount == 'FOOD' ? colors.cerulean : colors.jumbo }}>Diskon makanan</Chip>
                        <Chip onPress={() => setDicount(prevState => (prevState == 'FREE_SHIPPING' ? null : 'FREE_SHIPPING'))} selected={discount == 'FREE_SHIPPING'} selectedColor={discount == 'FREE_SHIPPING' ? colors.cerulean : colors.jumbo} style={{ marginHorizontal: 5, borderWidth: 1, backgroundColor: colors.white, borderColor: discount == 'FREE_SHIPPING' ? colors.cerulean : colors.jumbo }}>Gratis Ongkir</Chip>
                    </View>
                </ScrollView>
                <View style={{ width: '100%', height: 85, alignItems: 'center', backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.athensGray }}>
                    <InputItems.MyButton
                        disabled={(sortType == '' || discount == '')}
                        onPress={_onApplyFilter}
                        style={[styles.button, { width: '100%', marginVertical: 15 }]}
                        label={'Terapkan'}
                        labelStyle={{ fontSize: 16 }} />
                </View>
            </View>
        </MyModal>
    )
}))