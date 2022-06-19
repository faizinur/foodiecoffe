import { Merchant } from '@Model';
import { useState, useCallback } from 'react';
import { log } from '@Utils';
export default () => {
    const { getMerchantCategory, getCategoryList } = Merchant;
    const [merchantList, setMerchantList] = useState([])
    const [merchantError, setMerchantError] = useState('');
    const [categoryList, setcategoryList] = useState([]);
    const [loading, setLoading] = useState(false);

    const _getMerchant = useCallback(async () => {
        try {
            setLoading(true)
            setMerchantError('')
            const { status, data, message } = await getMerchantCategory();
            if (status != 'SUCCESS') throw message;
            setMerchantList(data)
            setLoading(false)
        } catch (err) {
            setMerchantError(`error Merchant ${err}`)
            setLoading(false)
        }
    }, [])

    const _getCategoryList = useCallback(async (params) => {
        try {
            const { status, data, message } = await getCategoryList();
            if (status != 'SUCCESS') throw message;
            setcategoryList(data)
        } catch (err) {
            log('getCategoryList : ', err)
        }
    }, [categoryList])
    return {
        _getMerchant,
        _getCategoryList,
        merchantList,
        categoryList,
        loading,
        merchantError,
    }
}

