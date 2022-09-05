import { Transaksi } from '@Model';
const { getDaftarTransaksi } = Transaksi;
import { log, MyRealm } from '@Utils';
import { TRANSACTION } from '@Utils/Realm/types';
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
            let tmpTransaction = data.map(transaction => {
                transaction.summaryItem.map(summaryItem => summaryItem.options = summaryItem.options == null ? [] : summaryItem.options)
                transaction = { ...transaction, items: transaction.summaryItem, tableNumber: '??xx??' }
                delete transaction['summaryItem']
                return transaction;
            });
            setTransactionList(tmpTransaction);
            await MyRealm.insertData(TRANSACTION, tmpTransaction)
            setTransactionLoading(false);
        } catch (e) {
            setErrorTransaksi(e);
            global.showToast(e);
        }
    }, [transactionList]);

    const _pollingTransaksiList = useCallback(async () => {
        const { status, data } = await getDaftarTransaksi();
        if (status == 'SUCCESS') return false;
        let tmpTransaction = data.map(transaction => {
            transaction.summaryItem.map(summaryItem => summaryItem.options = summaryItem.options == null ? [] : summaryItem.options)
            transaction = { ...transaction, items: transaction.summaryItem, tableNumber: '??xx??' }
            delete transaction['summaryItem']
            return transaction;
        });
        setTransactionList(tmpTransaction);
        await MyRealm.insertData(TRANSACTION, tmpTransaction)
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