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
    const [counter, setCounter] = useState(0);
    const [location, setLocation] = useState(null);

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
        _resetCounter()
    }, [modalVisible, animationType]);
    const _resetCounter = () => {
        setCounter(0)
        setLocation(null)
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
                    {(location != null || counter > 0) && <MyText bold color={colors.wildWaterMelon} onPress={_resetCounter}>Reset</MyText>}
                </View>
                <MyText left color={colors.black}>Pilih Lokasi</MyText>
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Chip onPress={() => setLocation(prevState => (prevState == 'Lantai 1' ? null : 'Lantai 1'))} selected={location == 'Lantai 1'} selectedColor={location == 'Lantai 1' ? colors.cerulean : colors.jumbo} style={{ marginHorizontal: 5, borderWidth: 1, backgroundColor: colors.white, borderColor: location == 'Lantai 1' ? colors.cerulean : colors.jumbo }}>Lantai 1</Chip>
                    <Chip onPress={() => setLocation(prevState => (prevState == 'Lantai 2' ? null : 'Lantai 2'))} selected={location == 'Lantai 2'} selectedColor={location == 'Lantai 2' ? colors.cerulean : colors.jumbo} style={{ marginHorizontal: 5, borderWidth: 1, backgroundColor: colors.white, borderColor: location == 'Lantai 2' ? colors.cerulean : colors.jumbo }}>Lantai 2</Chip>
                    <Chip onPress={() => setLocation(prevState => (prevState == 'Lantai 3' ? null : 'Lantai 3'))} selected={location == 'Lantai 3'} selectedColor={location == 'Lantai 3' ? colors.cerulean : colors.jumbo} style={{ marginHorizontal: 5, borderWidth: 1, backgroundColor: colors.white, borderColor: location == 'Lantai 3' ? colors.cerulean : colors.jumbo }}>Lantai 3</Chip>
                </View>
                <MyText left color={colors.black}>Jumlah Orang</MyText>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.white, width: '100%', height: 60, borderRadius: 12, borderWidth: 1.5, borderColor: colors.athensGray, }}>
                    <TouchableOpacity
                        activeOpacity={.9}
                        disabled={counter == 0}
                        onPress={() => counter > 0 && setCounter(prevState => (prevState - 1))}
                        style={{ width: 50, height: 50, borderRadius: 25, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name='minus' size={20} color={counter == 0 ? colors.athensGray : colors.black} />
                    </TouchableOpacity>
                    <MyText medium color={colors.black}>{counter}</MyText>
                    <TouchableOpacity
                        activeOpacity={.9}
                        onPress={() => setCounter(prevState => (prevState + 1))}
                        style={{ width: 50, height: 50, borderRadius: 25, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name='plus' size={20} color={colors.black} />
                    </TouchableOpacity>
                </View>
                <InputItems.MyButton
                    disabled={(location != null || counter > 0)}
                    onPress={() => { }}
                    style={{ width: '100%', marginVertical: 15 }}
                    label={'Tampilkan 20 Menu'}
                    labelStyle={{ fontSize: 16 }} />
            </Animated.View>
        </MyModal>
    )
})