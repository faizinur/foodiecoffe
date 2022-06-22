import { Merchant } from '@Model';
import React, { useState, useCallback } from 'react';
import { log } from '@Utils';
export default () => {
    const { getMerchantCategory, getCategoryList } = Merchant;
    const [merchantList, setMerchantList] = useState([])
    const [merchantError, setMerchantError] = useState('');
    const [categoryList, setcategoryList] = useState([]);
    const [filteredCategory, setFilteredCategory] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
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


    const _filterCategory = useCallback(({ nativeEvent: { text } }) => {
        if (text == '') return false;
        try {
            setLoading(true)
            setMerchantError('')
            let tmpMerchant = [...merchantList].filter(({ name }) => name.toLowerCase().includes(text.toLowerCase()))
            if (tmpMerchant.length == 0) throw 'MERCHANT_NOT_FOUND';
            setFilteredCategory(tmpMerchant)
            setLoading(false)
            tmpMerchant = []
        } catch (err) {
            log('_filterMerchant : ', err);
            setMerchantError(err)
            setLoading(false)
        }
    }, [searchQuery, filteredCategory, merchantList])

    const _clearFilteredCategory = useCallback(() => {
        setFilteredCategory([])
        setSearchQuery('')
        setMerchantError('')

    }, [searchQuery, filteredCategory])
    return {
        _getMerchant,
        _getCategoryList,
        merchantList,
        categoryList,
        loading,
        merchantError,
        searchQuery,
        setSearchQuery,
        _filterCategory,
        filteredCategory,
        _clearFilteredCategory
    }
}

