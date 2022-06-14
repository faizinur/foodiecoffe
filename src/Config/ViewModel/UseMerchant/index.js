import { Merchant } from '@Model';
import { useState, useCallback } from 'react';
import { log } from '@Utils';
export default () => {
    const { getMerchantCategory } = Merchant;
    const [merchantList, setMerchantList] = useState([])
    const [merchantError, setMerchantError] = useState('');
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

    return {
        _getMerchant,
        merchantList,
        loading,
        merchantError,
    }
}

