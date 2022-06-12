import { RiwayatTransaksi } from '@Model';
const { getRiwayatTransaksi } = RiwayatTransaksi;
import { log } from '@Utils';
import { useState, useCallback } from 'react';
let ORDER_LIST = [];
let FETCHING_RIWAYAT_TRANSAKSI = false;
export default () => {
    const ORDER_TYPES = ['PAID', 'CANCELED'];
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const [activeOrderList, setActiveOrderList] = useState(ORDER_TYPES[0]);

    const _getRiwayatTransaksi = async (transactionType = 'PAID') => {
        if (loading == true) {
            log('lagi kerja')
            return false;
        }
        try {
            FETCHING_RIWAYAT_TRANSAKSI = true;
            ORDER_LIST = await getRiwayatTransaksi();
            setLoading(true);
            setActiveOrderList(transactionType)
            setError('')
            setTimeout(() => {
                setOrderList(ORDER_LIST.filter(({ orderStatus }) => orderStatus == transactionType));
                setLoading(false);
                ORDER_LIST = [];
                FETCHING_RIWAYAT_TRANSAKSI = false;
            }, 500)
        } catch (e) {
            FETCHING_RIWAYAT_TRANSAKSI = false;
            log(e)
            setError(e);
        }
    }

    return {
        error,
        loading,
        orderList,
        activeOrderList,
        _getRiwayatTransaksi,
        ORDER_TYPES,
    }
}

