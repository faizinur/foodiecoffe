import { Order, Auth } from '@Model';
import { useState, useCallback, useMemo } from 'react';
import { log, CONSTANT } from '@Utils';
let SUBSCRIBE_TIMEOUT = null;
export default () => {
    const { getOrders } = Order;
    const { getUserData } = Auth;
    const [orderList, setOrderList] = useState([])
    const [orderError, setOrderError] = useState('');
    const [refreshingOrder, setRefreshingOrder] = useState(false);

    const _getOrders = useMemo(() => async () => {
        try {
            setRefreshingOrder(true)
            setOrderError('')
            const userData = await getUserData();
            if (userData == null) return Promise.reject(`userData null`);
            const { status, data, message } = await getOrders(userData.user.merchantId);
            if (status != 'SUCCESS') throw message;
            setOrderList(data)
            setRefreshingOrder(false)
        } catch (err) {
            setOrderError(`error Merchant ${err}`)
            setRefreshingOrder(false)
            global.showToast(err);
        }
    }, [orderList]);

    const _subscribeOrders = useMemo(() => async () => {
        const userData = await getUserData();
        if (userData == null) return Promise.reject(`userData null`);
        const { status, data, message } = await getOrders(userData.user.merchantId);
        if (status == 'SUCCESS') {
            setOrderList(data)
        } else {
            log('_subscribeOrders : ', message)
        }

        await new Promise(resolve => {
            _unSubscribeOrders();
            SUBSCRIBE_TIMEOUT = setTimeout(resolve, CONSTANT.CONNECT_RETRIES)
        });
        await _subscribeOrders();
    }, [orderList]);

    const _unSubscribeOrders = () => {
        clearTimeout(SUBSCRIBE_TIMEOUT)
    }
    return {
        _getOrders,
        _subscribeOrders,
        _unSubscribeOrders,
        orderList,
        refreshingOrder,
        setRefreshingOrder,
        orderError,
    }
}