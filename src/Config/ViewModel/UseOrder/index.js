import { Order, Auth } from '@Model';
import { useState, useMemo, useCallback } from 'react';
import { log, CONSTANT, MyRealm } from '@Utils';
import { NEW_ORDER } from '@Utils/Realm/types';
let SUBSCRIBE_ORDER_TIMEOUT = null;
export default () => {
    let page = 1;
    const { getOrders } = Order;
    const { getUserData } = Auth;
    const [orderList, setOrderList] = useState([])
    const [orderError, setOrderError] = useState('');
    const [refreshingOrder, setRefreshingOrder] = useState(false);

    const _getOrders = useCallback(async () => {
        try {
            setRefreshingOrder(true)
            setOrderError('')
            const userData = await getUserData();
            if (userData == null) return Promise.reject(`userData null`);
            const { status, data, message } = await getOrders(userData?.user?.merchantId, 1);
            if (status != 'SUCCESS') throw message;
            if (data.length > 0) {
                setOrderList(data)
                await MyRealm.insertData(NEW_ORDER, data.map(order => ({ ...order, total: 0, totalAddons: 0, totalOptions: 0 })));
                page = 1;
            }
            setRefreshingOrder(false)
        } catch (err) {
            setOrderError(`error Merchant ${err}`)
            setRefreshingOrder(false)
            global.showToast(err);
        }
    }, []);

    const _subscribeOrders = useCallback(async () => {
        try {
            const userData = await getUserData();
            if (userData == null) return Promise.reject(`userData null`);
            const { status, data } = await getOrders(userData?.user?.merchantId, 1);
            if (status == 'SUCCESS') {
                if (data.length > 0) {
                    memoizedOrderList(data)
                    await MyRealm.insertData(NEW_ORDER, data.map(order => ({ ...order, total: 0, totalAddons: 0, totalOptions: 0 })));
                }
            }
            await new Promise(resolve => {
                _unSubscribeOrders();
                SUBSCRIBE_ORDER_TIMEOUT = setTimeout(resolve, CONSTANT.CONNECT_RETRIES)
            });
            await _subscribeOrders();
        } catch (err) {
            await _subscribeOrders();
        }
    }, [])

    const _unSubscribeOrders = () => {
        clearTimeout(SUBSCRIBE_ORDER_TIMEOUT);
    }

    const memoizedOrderList = useCallback((data) => {
        setOrderList(prevState => {
            data.map(order => {
                if (prevState.filter(({ id }) => id == order.id) == 0) {
                    prevState = [...prevState, order]
                }
            })
            return prevState;
        })
    }, [orderList])

    const _onReachEnd = useCallback(async () => {
        try {
            setRefreshingOrder(true)
            setOrderError('')
            const userData = await getUserData();
            if (userData == null) return Promise.reject(`userData null`);
            const { status, data, message } = await getOrders(userData?.user?.merchantId, page);
            if (status != 'SUCCESS') throw message;
            if (data.length > 0) {
                memoizedOrderList(data);
                page = page + 1;
            }
            setRefreshingOrder(false)
        } catch (err) {
            setOrderError(`error Merchant ${err}`);
            setRefreshingOrder(false);
            global.showToast(err);
            page = page - 1;
        }
    }, [])

    const _onRefreshOrder = useCallback(() => {
        _getOrders();
        setRefreshingOrder(true);
        setTimeout(() => setRefreshingOrder(false), 3000);
    }, [refreshingOrder])

    return {
        _getOrders,
        _subscribeOrders,
        _unSubscribeOrders,
        orderList,
        refreshingOrder,
        setRefreshingOrder,
        orderError,
        _onReachEnd,
        _onRefreshOrder,
    }
}
