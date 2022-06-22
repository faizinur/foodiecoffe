import { Transaksi } from '@Model';
const { getDaftarTransaksi } = Transaksi;
import { log } from '@Utils';
import { useState } from 'react';
let TRANSACTION_LIST = [];
export default () => {
    const ORDER_TYPES = ['PAID', 'CANCELED'];
    const [errorTransaksi, setErrorTransaksi] = useState('');
    const [loading, setLoading] = useState(false);
    const [transactionList, setTransactionList] = useState([]);
    const [activeTransationList, setActiveTransationList] = useState(ORDER_TYPES[0]);

    const _getTransaksiList = async (transactionType = 'PAID') => {
        if (loading == true) {
            log('lagi kerja')
            return false;
        }
        try {
            TRANSACTION_LIST = await getDaftarTransaksi();
            setLoading(true);
            setActiveTransationList(transactionType)
            setErrorTransaksi('')
            setTimeout(() => {
                setTransactionList(TRANSACTION_LIST.filter(({ orderStatus }) => orderStatus == transactionType));
                setLoading(false);
                TRANSACTION_LIST = [];
            }, 500)
        } catch (e) {
            log(e)
            setErrorTransaksi(e);
        }
    }

    return {
        errorTransaksi,
        loading,
        transactionList,
        activeTransationList,
        _getTransaksiList,
        ORDER_TYPES,
    }
}

