import { TouchableOpacity } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, } from 'react';
import { log, CONSTANT } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText, MyModal } from '@Atoms';
import styles, { width, height } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
export default forwardRef((props, ref) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [animationType, setAnimationType] = useState('slide');
    const [dropdownList, setDropdownList] = useState([]);
    const [selectedList, setSelectedList] = useState('');
    const [inputName, setInputName] = useState('');
    const drawerHeight = useSharedValue({
        height: height / 2,
        paddingTop: 24
    })
    const drawerHeightStyle = useAnimatedStyle(() => ({
        height: withSpring(drawerHeight.value.height, CONSTANT.SPRING_CONFIG),
        paddingTop: withSpring(drawerHeight.value.paddingTop, CONSTANT.SPRING_CONFIG),
    }))
    useImperativeHandle(ref, () => ({
        toggle,
    }));

    const toggle = useCallback(({ name, data }) => {
        log('toggle : ', data)
        if (data.length == 0) return false;
        setInputName(name)
        setDropdownList(data)
        setModalVisible(prevState => !prevState);
    }, [modalVisible, dropdownList, inputName])

    const _onSelectList = useCallback((code) => {
        setSelectedList(code)
        props?.onSelectList(inputName, code)
        setAnimationType('fade')
        drawerHeight.value = {
            height: height / 2,
            paddingTop: 24
        }
        setModalVisible(prevState => !prevState);
    }, [modalVisible, animationType, inputName]);

    const _onCloseModal = useCallback(() => {
        setAnimationType('fade')
        drawerHeight.value = {
            height: height / 2,
            paddingTop: 24
        }
        setModalVisible(prevState => !prevState);
    }, [modalVisible, animationType]);
    return (
        <MyModal
            visible={modalVisible}
            animationType={animationType}
            onRequestClose={_onCloseModal}
            statusBarTranslucent={true}
            contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}>
            <Animated.View style={[drawerHeightStyle, { width: width, backgroundColor: colors.white, borderTopLeftRadius: 16, borderTopRightRadius: 16 }]}>
                {
                    dropdownList.map(({ code, description }) =>
                        <TouchableOpacity onPress={() => _onSelectList(code)} key={`${code}-${description}`} activeOpacity={.8}
                            style={{ height: 40, width: '100%', marginVertical: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%' }}>
                            <MyText left center color={selectedList == code ? colors.cerulean : colors.black}>{description}</MyText>
                            {selectedList == code && <Icon name={'check'} size={25} color={colors.cerulean} />}
                        </TouchableOpacity>
                    )
                }
            </Animated.View>
        </MyModal>
    )
})
