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
            setTransactionList(data.map(transaction => ({ ...transaction, items: transaction.summaryItem })));
            setTransactionLoading(false);
        } catch (e) {
            setErrorTransaksi(e);
            global.showToast(e);
        }
    }, [transactionList]);

    const _pollingTransaksiList = useCallback(async () => {
        const { status, data } = await getDaftarTransaksi();
        if (status == 'SUCCESS') return false;
        setTransactionList(data.map(transaction => ({ ...transaction, items: transaction.summaryItem })));
    }, [transactionList])

    const _filterTransaksi = async (date) => {
        log('_filterTransaksi : ', date)
    }

    const _onChangeTransactionList = useCallback(state => {
        setActiveTransationList(state)
    }, [activeTransationList])


    const memoizedTransactionList = useMemo(() =>
        transactionList.filter(({ status }) => status == activeTransationList),
        [transactionList, activeTransationList])

    const memoizedTransactionTypeCount = useMemo(() =>
        [transactionList.filter(({ status }) => status == 'success').length,
        transactionList.filter(({ status }) => status == 'failed').length]
        , [transactionList])


    return {
        errorTransaksi,
        transactionLoading,
        setTransactionLoading,
        transactionList,
        memoizedTransactionList,
        memoizedTransactionTypeCount,
        activeTransationList,
        _getTransaksiList,
        _pollingTransaksiList,
        _filterTransaksi,
        _onChangeTransactionList,
    }
}