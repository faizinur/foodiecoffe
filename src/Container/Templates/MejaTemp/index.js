import { View, TouchableOpacity, Modal, StatusBar } from 'react-native';
import React, { useEffect, memo, useRef, useState, useCallback } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText, PageWrapper } from '@Atoms';
import { TitleBar, InputItems } from '@Molecules';
import { CardMeja } from '@Organisms';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
let searchState = false;
export default memo(({ navigation }) => {
    const { colors } = useTheme();
    const refTextinput = useRef(<View />)
    const refTextTitle = useRef(<View />)
    const [modalVisible, setModalVisible] = useState(false);
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

    const _onPressMeja = useCallback(() => {
        log('_onPressMeja : ')
        setModalVisible(prevState => !prevState);
    }, [modalVisible])
    useEffect(() => {
        log('Mount MejaTemp');
        return () => {
            log('Unmount MejaTemp')
        }
    }, [])
    return (
        <View style={styles.pages}>
            <PageWrapper noGap>
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
                <View style={styles.sectionContainer}>
                    <MyText bold medium color={colors.black} left>Cek Mejamu disini</MyText>
                    <MyText left>Yuk, pilih lokasi mejamu sebelum penuh</MyText>
                </View>
                <View style={styles.content}>
                    <CardMeja number={'01'} isServed={false} location={'Lantai 1'} capacity={'1 - 10'} onPress={_onPressMeja} />
                    <CardMeja number={'02'} isServed={true} location={'Lantai 1'} capacity={'1 - 10'} onPress={_onPressMeja} />
                    <CardMeja number={'01'} isServed={false} location={'Lantai 1'} capacity={'1 - 10'} onPress={_onPressMeja} />
                </View>
            </PageWrapper>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                statusBarTranslucent={true}
                onRequestClose={() => {
                    setModalVisible(prevState => !prevState);
                }}
                style={styles.modal}>
                <View style={{ flex: 1 }}>
                    <View style={{
                        flex: 1, backgroundColor: colors.white,
                        marginTop: StatusBar.currentHeight,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        borderTopWidth: 0.5,
                        borderTopColor: colors.athensGray,
                        paddingTop: 4,
                    }}>
                        <View style={{ height: 4, width: 30, alignSelf: 'center', backgroundColor: colors.athensGray, borderRadius: 100 }} />
                        <View style={{ width: 98, height: 44, backgroundColor: colors.athensGray, borderRadius: 100, paddingHorizontal: 15, alignSelf: 'center', marginVertical: 32, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ backgroundColor: colors.white, height: 32, width: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name={'desktop-tower-monitor'} size={20} color={colors.cerulean} />
                            </View>
                            <MyText bold color={colors.black}>04</MyText>
                        </View>
                        <View style={{ width: 180, height: 180, alignSelf: 'center', marginVertical: 10 }}>
                            <View style={{ width: 131, height: 131, backgroundColor: colors.magnolia, position: 'absolute', top: 29, left: 29, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name={'qrcode'} size={130} color={colors.black} />
                            </View>
                            <View style={{ width: 21, height: 21, position: 'absolute', top: 0, right: 0, borderTopWidth: 5, borderRightWidth: 5, borderColor: colors.cerulean, borderTopRightRadius: 7 }} />
                            <View style={{ width: 21, height: 21, position: 'absolute', top: 0, left: 0, borderTopWidth: 5, borderLeftWidth: 5, borderColor: colors.cerulean, borderTopLeftRadius: 7 }} />
                            <View style={{ width: 21, height: 21, position: 'absolute', bottom: 0, right: 0, borderBottomWidth: 5, borderRightWidth: 5, borderColor: colors.cerulean, borderBottomRightRadius: 7 }} />
                            <View style={{ width: 21, height: 21, position: 'absolute', bottom: 0, left: 0, borderBottomWidth: 5, borderLeftWidth: 5, borderColor: colors.cerulean, borderBottomLeftRadius: 7 }} />

                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', height: 80, paddingHorizontal: '5%', justifyContent: 'center', }}>
                    <InputItems.MyButton
                        label={'Perbaharui'}
                        onPress={() => {
                            log('Simpan update Data : ')
                        }}
                    />
                </View>
            </Modal>
        </View>
    )
})
