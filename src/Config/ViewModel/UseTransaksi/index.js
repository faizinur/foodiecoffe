import { Transaksi } from '@Model';
const { getDaftarTransaksi } = Transaksi;
import { log } from '@Utils';
import { useState, useMemo, useCallback } from 'react';
export default () => {
    const [errorTransaksi, setErrorTransaksi] = useState('');
    const [transactionLoading, setTransactionLoading] = useState(false);
    const [transactionList, setTransactionList] = useState([]);
    const [activeTransationList, setActiveTransationList] = useState('success');

    const _getTransaksiList = useMemo(() => async (transactionType = 'success') => {
        try {
            setTransactionLoading(true);
            setErrorTransaksi('')
            setActiveTransationList(transactionType)
            const { status, data, message } = await getDaftarTransaksi();

            if (status != 'SUCCESS') throw message;
            setTransactionList(data);
            setTransactionLoading(false);
        } catch (e) {
            setErrorTransaksi(e);
            global.showToast(e);
        }
    }, [transactionList]);

    const _filterTransaksi = async (date) => {
        log('_filterTransaksi : ', date)
    }

    const _onChangeTransactionList = useCallback(state => {
        setActiveTransationList(state)
    }, [activeTransationList])


    const memoizedTransactionList = useMemo(() => {
        let transaction = transactionList.filter(({ status }) => status == activeTransationList)
        log('hayoo kesini gak?', activeTransationList, transaction.length)
        return transaction
    }, [activeTransationList])

    return {
        errorTransaksi,
        transactionLoading,
        transactionList,
        memoizedTransactionList,
        activeTransationList,
        _getTransaksiList,
        _filterTransaksi,
        _onChangeTransactionList,
    }
}