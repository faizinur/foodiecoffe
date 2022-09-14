import { Transaksi } from '@Model';
const { getDaftarTransaksi } = Transaksi;
import { log, MyRealm } from '@Utils';
import { TRANSACTION } from '@Utils/Realm/types';
import { useState, useMemo, useCallback } from 'react';
export default () => {
    let page = 1;
    const [errorTransaksi, setErrorTransaksi] = useState('');
    const [transactionLoading, setTransactionLoading] = useState(false);
    const [transactionList, setTransactionList] = useState([]);
    const [activeTransationList, setActiveTransationList] = useState('success');

    const _getTransaksiList = useMemo(() => async (transactionType = 'success') => {
        try {
            setTransactionLoading(true);
            setErrorTransaksi('')
            setActiveTransationList(transactionType)
            const { status, data, message } = await getDaftarTransaksi(page);
            if (status != 'SUCCESS') throw message;
            memoizedtransactionList(data)
            await MyRealm.insertData(TRANSACTION, transactionList)
            setTransactionLoading(false);
            page = 1;
        } catch (e) {
            setErrorTransaksi(e);
            global.showToast(e);
        }
    }, [transactionList]);

    const _pollingTransaksiList = useCallback(async () => {
        const { status, data } = await getDaftarTransaksi();
        if (status != 'SUCCESS' || data.length == 0) return false;
        memoizedtransactionList(data)
        await MyRealm.insertData(TRANSACTION, transactionList)
    }, [transactionList])

    const _filterTransaksi = async (date) => {
        log('_filterTransaksi : ', date)
    }

    const _onChangeTransactionList = useCallback(state => {
        setActiveTransationList(state)
    }, [activeTransationList])

    const _onReachEnd = useCallback(async () => {
        try {
            const { status, data } = await getDaftarTransaksi(page);
            if (status != 'SUCCESS' || data.length == 0) return false;
            memoizedtransactionList(data);
            await MyRealm.insertData(TRANSACTION, transactionList);
            page = page + 1
        } catch (err) {
            global.showToast(err);
            page = page - 1;
        }
    }, [activeTransationList, transactionList])


    const memoizedtransactionList = useCallback(data => {
        let tmpTransaction = data.map(transaction => {
            transaction.summaryItem.map(summaryItem => summaryItem.options = summaryItem.options == null ? [] : summaryItem.options)
            transaction = { ...transaction, items: transaction.summaryItem, tableNumber: '??xx??', totalAddons: 0, totalOptions: 0, }
            delete transaction['summaryItem']
            return transaction;
        });
        setTransactionList(prevState => {
            tmpTransaction.map(transaction => {
                if (prevState.filter(({ id }) => id == transaction?.id) == 0) {
                    prevState = [...prevState, transaction]
                }
            })
            return prevState;
        })
    }, [transactionList])

    const memoizedTransactionList = useMemo(() =>
        transactionList.filter(({ status }) => status == activeTransationList),
        [transactionList, activeTransationList])

    const memoizedTransactionTypeCount = useMemo(() =>
        [transactionList.filter(({ status }) => status == 'success').length,
        transactionList.filter(({ status }) => status == 'failed').length]
        , [transactionList])

    const _onRefreshTransaction = useCallback(() => {
        _getTransaksiList(activeTransationList);
        setTransactionLoading(true);
        setTimeout(() => setTransactionLoading(false), 3000);
    }, [transactionLoading]);

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
        _onRefreshTransaction,
        _onReachEnd,
    }
}