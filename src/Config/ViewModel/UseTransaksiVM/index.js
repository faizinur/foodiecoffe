import { DaftarTransaksi } from '@Model';
const { getDaftarTransaksi } = DaftarTransaksi;
import { log } from '@Utils';
import { useState } from 'react';
let ORDER_LIST = [];
export default () => {
    const ORDER_TYPES = ['PAID', 'CANCELED'];
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const [activeOrderList, setActiveOrderList] = useState(ORDER_TYPES[0]);

    const _getDaftarTransaksi = async (transactionType = 'PAID') => {
        if (loading == true) {
            log('lagi kerja')
            return false;
        }
        try {
            ORDER_LIST = await getDaftarTransaksi();
            setLoading(true);
            setActiveOrderList(transactionType)
            setError('')
            setTimeout(() => {
                setOrderList(ORDER_LIST.filter(({ orderStatus }) => orderStatus == transactionType));
                setLoading(false);
                ORDER_LIST = [];
            }, 500)
        } catch (e) {
            log(e)
            setError(e);
        }
    }

    return {
        error,
        loading,
        orderList,
        activeOrderList,
        _getDaftarTransaksi,
        ORDER_TYPES,
    }
}

