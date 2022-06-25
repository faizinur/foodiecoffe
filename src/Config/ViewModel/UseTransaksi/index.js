import { Transaksi } from '@Model';
const { getDaftarTransaksi } = Transaksi;
import { log } from '@Utils';
import { useState, useMemo, useCallback } from 'react';
export default () => {
    const ORDER_TYPES = [0, 1];
    const [errorTransaksi, setErrorTransaksi] = useState('');
    const [transactionLoading, setTransactionLoading] = useState(false);
    const [transactionList, setTransactionList] = useState([]);
    const [activeTransationList, setActiveTransationList] = useState(ORDER_TYPES[0]);

    const _getTransaksiList = useMemo(() => async (transactionType = 0) => {
        try {
            setTransactionLoading(true);
            setErrorTransaksi('')
            setActiveTransationList(transactionType)
            const { status, data, message } = await getDaftarTransaksi();
            if (status != 'SUCCESS' || status != '') throw message;
            setTransactionList(data)//.filter(({ paid }) => paid == transactionType));
            setTransactionLoading(false);
        } catch (e) {
            setErrorTransaksi(e);
        }
    }, [transactionList]);

    const _filterTransaksi = async (date) => {
        log('_filterTransaksi : ', date)
    }

    return {
        errorTransaksi,
        transactionLoading,
        transactionList,
        activeTransationList,
        _getTransaksiList,
        ORDER_TYPES,
        _filterTransaksi,
    }
}