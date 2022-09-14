import { View, } from 'react-native';
import React, { useState, useCallback, forwardRef, useImperativeHandle, memo, useRef } from 'react';
import { log } from '@Utils';
import { MyModal } from '@Atoms';
import { MerchantTemp, MejaTemp } from '@Templates';
import { PagerView } from 'react-native-pager-view';
import styles, { width, height, } from './styles';
export default memo(forwardRef((props, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
    let ACTIVE_PAGE = 0;
    let SELECTED_TABLE = {};
    let SELECTED_CATEGORY = {};
    const refPagerView = useRef(<PagerView />);

    const _onChooseMeja = meja => {
        SELECTED_TABLE = meja;
        ACTIVE_PAGE = 1;
        refPagerView.current?.setPage(ACTIVE_PAGE)
    }

    const _onSelectCategory = useCallback(category => {
        SELECTED_CATEGORY = category;
        setModalVisible(prevState => !prevState);
        props.onSelectedMejaCategory({ merchantId: SELECTED_CATEGORY.merchantId, categoryId: SELECTED_CATEGORY.id, tableId: SELECTED_TABLE.id, name: SELECTED_CATEGORY.name });
    }, [modalVisible])
    useImperativeHandle(ref, () => ({
        toggle,
    }));
    const toggle = useCallback(() => {
        log('_toggle : ');
        setModalVisible(prevState => !prevState);
    }, [modalVisible])
    const _onCloseModal = useCallback(() => {
        if (ACTIVE_PAGE > 0) {
            ACTIVE_PAGE = 0;
            refPagerView.current?.setPage(ACTIVE_PAGE)
            return false;
        }
        SELECTED_TABLE = {};
        SELECTED_CATEGORY = {}
        setModalVisible(prevState => !prevState);
    }, [modalVisible]);

    return (
        <MyModal
            visible={modalVisible}
            onRequestClose={_onCloseModal}
            statusBarTranslucent={true}
            contentContainerStyle={styles.contentModalContainerStyle}>
            <PagerView
                ref={refPagerView}
                style={{ flex: 1 }}
                initialPage={0}
                scrollEnabled={false}>
                <View style={{ width, height, paddingTop: 20 }} key={0}>
                    <MejaTemp onChooseMeja={_onChooseMeja} />
                </View>
                <View style={{ width, height }} key={1}>
                    <MerchantTemp onSelectCategory={_onSelectCategory} />
                </View>
            </PagerView>
        </MyModal>
    )
}));