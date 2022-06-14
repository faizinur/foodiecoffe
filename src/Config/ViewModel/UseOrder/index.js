import { Order } from '@Model';
import { useState, useCallback } from 'react';
import { log } from '@Utils';
export default () => {
    const { getOrders } = Order;
    const [orderList, setOrderList] = useState([])
    const [orderError, setOrderError] = useState('');
    const [orderLoading, setOrderLoading] = useState(false);

    const _getOrders = useCallback(async () => {
        try {
            setOrderLoading(true)
            setOrderError('')
            const { status, data, message } = await getOrders();
            if (status != 'SUCCESS') throw message;
            setOrderList(data)
            setOrderLoading(false)
        } catch (err) {
            setOrderError(`error Merchant ${err}`)
            setOrderLoading(false)
        }
    }, [])

    return {
        _getOrders,
        orderList,
        orderLoading,
        orderError,
    }
}

