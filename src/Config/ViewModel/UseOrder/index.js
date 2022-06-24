import { Order } from '@Model';
import { useState, useCallback, useMemo } from 'react';
import { log, CONSTANT } from '@Utils';
let SUBSCRIBE_TINEOUT = null;
export default () => {
    const { getOrders } = Order;
    const [orderList, setOrderList] = useState([])
    const [orderError, setOrderError] = useState('');
    const [refreshingOrder, setRefreshingOrder] = useState(false);

    const _getOrders = useMemo(() => async () => {
        try {
            setRefreshingOrder(true)
            setOrderError('')
            const { status, data, message } = await getOrders();
            if (status != 'SUCCESS') throw message;
            setOrderList(data)
            setRefreshingOrder(false)
        } catch (err) {
            setOrderError(`error Merchant ${err}`)
            setRefreshingOrder(false)
        }
    }, [orderList]);

    const _subscribeOrders = useMemo(() => async () => {
        const { status, data, message } = await getOrders();
        if (status == 'SUCCESS') {
            setOrderList(data)
        } else {
            log('_subscribeOrders : ', message)
        }

        await new Promise(resolve => {
            _unSubscribeOrders();
            SUBSCRIBE_TINEOUT = setTimeout(resolve, CONSTANT.CONNECT_RETRIES)
        });
        await _subscribeOrders();
    }, [orderList]);

    const _unSubscribeOrders = () => {
        clearTimeout(SUBSCRIBE_TINEOUT)
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