import { View, TouchableOpacity } from 'react-native'
import React, { useState, useCallback, forwardRef, useImperativeHandle, } from 'react';
import { log, CONSTANT } from '@Utils';
import { useTheme, Chip } from 'react-native-paper';
import { MyText, MyModal } from '@Atoms';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles, { width, height } from './styles';
import { InputItems } from '@Molecules';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
export default forwardRef((props, ref) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [animationType, setAnimationType] = useState('slide');
    const [seat, setSeat] = useState(0);
    const [floor, setFloor] = useState(null);

    const DOWN_SIZE = height * .2;
    const UP_SIZE = height * .9;

    const drawerHeight = useSharedValue({
        height: height / 2,
    })
    const drawerHeightStyle = useAnimatedStyle(() => ({
        height: withSpring(drawerHeight.value.height, CONSTANT.SPRING_CONFIG),
    }))
    useImperativeHandle(ref, () => ({
        toggle,
    }));
    const toggle = useCallback(() => {
        log('_toggle : ')
        setModalVisible(prevState => !prevState);
    }, [modalVisible])
    const _onCloseModal = useCallback(() => {
        setAnimationType('fade')
        setModalVisible(prevState => !prevState);
        drawerHeight.value = {
            height: height / 2,
        }
    }, [modalVisible, animationType]);
    const _resetCounter = () => {
        setSeat(0)
        setFloor(null);
        setModalVisible(prevState => !prevState);
        props?.onReset()
    }
    const _applyFilter = () => {
        setModalVisible(prevState => !prevState);
        props?.onApplyFilter(floor, seat)
    }
    return (
        <MyModal
            visible={modalVisible}
            animationType={animationType}
            onRequestClose={_onCloseModal}
            statusBarTranslucent={true}
            contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}>
            <Animated.View style={[drawerHeightStyle, { minHeight: DOWN_SIZE, maxHeight: UP_SIZE, width: '100%', backgroundColor: colors.white, borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingHorizontal: '5%', paddingBottom: 60, paddingTop: '5%' }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, height: 30 }}>
                    <MyText bold medium color={colors.black}>Filter Meja</MyText>
                    {(floor != null || seat > 0) && <MyText bold color={colors.wildWaterMelon} onPress={_resetCounter}>Reset</MyText>}
                </View>
                <MyText left color={colors.black}>Pilih Lokasi</MyText>
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Chip onPress={() => setFloor(prevState => (prevState == 1 ? null : 1))} selected={floor == 1} selectedColor={floor == 1 ? colors.cerulean : colors.jumbo} style={{ marginHorizontal: 5, borderWidth: 1, backgroundColor: colors.white, borderColor: floor == 1 ? colors.cerulean : colors.jumbo }}>Lantai 1</Chip>
                    <Chip onPress={() => setFloor(prevState => (prevState == 2 ? null : 2))} selected={floor == 2} selectedColor={floor == 2 ? colors.cerulean : colors.jumbo} style={{ marginHorizontal: 5, borderWidth: 1, backgroundColor: colors.white, borderColor: floor == 2 ? colors.cerulean : colors.jumbo }}>Lantai 2</Chip>
                    <Chip onPress={() => setFloor(prevState => (prevState == 3 ? null : 3))} selected={floor == 3} selectedColor={floor == 3 ? colors.cerulean : colors.jumbo} style={{ marginHorizontal: 5, borderWidth: 1, backgroundColor: colors.white, borderColor: floor == 3 ? colors.cerulean : colors.jumbo }}>Lantai 3</Chip>
                </View>
                <MyText left color={colors.black}>Jumlah Orang</MyText>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.white, width: '100%', height: 60, borderRadius: 12, borderWidth: 1.5, borderColor: colors.athensGray, }}>
                    <TouchableOpacity
                        activeOpacity={.9}
                        disabled={seat == 0}
                        onPress={() => seat > 0 && setSeat(prevState => (prevState - 1))}
                        style={{ width: 50, height: 50, borderRadius: 25, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name='minus' size={20} color={seat == 0 ? colors.athensGray : colors.black} />
                    </TouchableOpacity>
                    <MyText medium color={colors.black}>{seat}</MyText>
                    <TouchableOpacity
                        activeOpacity={.9}
                        onPress={() => setSeat(prevState => (prevState + 1))}
                        style={{ width: 50, height: 50, borderRadius: 25, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name='plus' size={20} color={colors.black} />
                    </TouchableOpacity>
                </View>
                <InputItems.MyButton
                    disabled={!(floor != null || seat > 0)}
                    onPress={_applyFilter}
                    style={{ width: '100%', marginVertical: 15 }}
                    label={'Terapkan Filter'}
                    labelStyle={{ fontSize: 16 }} />
            </Animated.View>
        </MyModal>
    )
})