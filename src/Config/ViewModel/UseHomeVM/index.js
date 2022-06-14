import { RiwayatTransaksi } from '@Model';
const { getRiwayatTransaksi } = RiwayatTransaksi;
import { log } from '@Utils';
import { useState } from 'react';
let ORDER_LIST = [];
let NEW_ORDER_LIST = [];
export default () => {
    const ORDER_TYPES = ['PAID', 'CANCELED'];
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [orderLists, setOrderLists] = useState([]);
    const [newOrderList, setNewOrderList] = useState([]);
    const [activeOrderList, setActiveOrderList] = useState(ORDER_TYPES[0]);

    const _getRiwayatTransaksi = async (transactionType = 'PAID') => {
        if (loading == true) {
            log('lagi kerja')
            return false;
        }
        try {
            ORDER_LIST = await getRiwayatTransaksi();
            setLoading(true);
            setError('')
            setActiveOrderList(transactionType)
            setTimeout(() => {
                setOrderLists(ORDER_LIST.filter(({ orderStatus }) => orderStatus == transactionType));
                setLoading(false);
                ORDER_LIST = [];
            }, 500)
        } catch (e) {
            log(e)
            setError(e);
        }
    }

    const _getNewTransaksi = async () => {
        if (loading == true) {
            log('lagi kerja')
            return false;
        }
        try {
            NEW_ORDER_LIST = await getRiwayatTransaksi();
            setLoading(true);
            setError('')
            setActiveOrderList(ORDER_TYPES[0])
            setTimeout(() => {
                setNewOrderList(NEW_ORDER_LIST.filter(({ orderStatus }) => orderStatus == ORDER_TYPES[0]));
                setLoading(false);
                NEW_ORDER_LIST = [];
            }, 4000)
        } catch (e) {
            log(e)
            setError(e);
        }
    }

    return {
        error,
        loading,
        orderLists,
        newOrderList,
        activeOrderList,
        _getRiwayatTransaksi,
        _getNewTransaksi,
        ORDER_TYPES,
    }
}

