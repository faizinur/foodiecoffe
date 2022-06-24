import { Transaksi } from '@Model';
const { getDaftarTransaksi } = Transaksi;
import { log } from '@Utils';
import { useState, useMemo, useCallback } from 'react';
export default () => {
    const ORDER_TYPES = [0, 1];
    const [errorTransaksi, setErrorTransaksi] = useState('');
    const [loading, setLoading] = useState(false);
    const [transactionList, setTransactionList] = useState([]);
    const [activeTransationList, setActiveTransationList] = useState(ORDER_TYPES[0]);

    const _getTransaksiList = useMemo(() => async (transactionType = 0) => {
        if (loading == true) return false;
        try {
            setLoading(true);
            setErrorTransaksi('')
            setActiveTransationList(transactionType)
            const { status, data, message } = await getDaftarTransaksi();
            if (status != 'SUCCESS') throw message;
            setTimeout(() => {
                setTransactionList(data.filter(({ paid }) => paid == transactionType));
                setLoading(false);
            }, 500)
        } catch (e) {
            log(e)
            setErrorTransaksi(e);
        }
    }, [transactionList]);

    const _filterTransaksi = async (date) => {
        log('_filterTransaksi : ', date)
    }

    return {
        errorTransaksi,
        loading,
        transactionList,
        activeTransationList,
        _getTransaksiList,
        ORDER_TYPES,
        _filterTransaksi,
    }
}