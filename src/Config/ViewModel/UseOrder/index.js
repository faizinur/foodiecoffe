import { Order } from '@Model';
import { useState, useCallback } from 'react';
import { log } from '@Utils';
export default () => {
    const { getOrders } = Order;
    const [orderList, setOrderList] = useState([])
    const [orderError, setOrderError] = useState('');
    const [refreshingOrder, setRefreshingOrder] = useState(false);

    const _getOrders = useCallback(async () => {
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
    }, [])

    return {
        _getOrders,
        orderList,
        refreshingOrder,
        setRefreshingOrder,
        orderError,
    }
}