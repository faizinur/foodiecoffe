import { Merchant } from '@Model';
import React, { useState, useCallback, useMemo } from 'react';
import { log } from '@Utils';
export default () => {
    const { getMerchantCategory, getCategoryList } = Merchant;
    const [merchantList, setMerchantList] = useState([])
    const [merchantError, setMerchantError] = useState('');
    const [merchantLoading, setMerchantLoading] = useState(false);
    const [categoryList, setcategoryList] = useState([]);
    const [filteredCategory, setFilteredCategory] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');

    const _getMerchant = useMemo(() => async () => {
        try {
            log('_getMerchant')
            setMerchantLoading(true)
            setMerchantError('')
            const { status, data, message } = await getMerchantCategory();
            if (status != 'SUCCESS') throw message;
            setMerchantList(data)
            setMerchantLoading(false)
        } catch (err) {
            setMerchantError(`error Merchant ${err}`)
            setMerchantLoading(false)
        }
    }, [merchantList])

    const _getCategoryList = useMemo(() => async (params) => {
        try {
            setMerchantLoading(true)
            setMerchantError('')
            const { status, data, message } = await getCategoryList();
            if (status != 'SUCCESS') throw message;
            setcategoryList(data)
            setMerchantLoading(false)
        } catch (err) {
            log('getCategoryList : ', err)
            setMerchantError(err)
            setMerchantLoading(false)
        }
    }, [categoryList])


    const _filterCategory = useCallback(({ nativeEvent: { text } }) => {
        if (text == '') return false;
        try {
            setMerchantLoading(true)
            setMerchantError('')
            let tmpMerchant = [...merchantList].filter(({ name }) => name.toLowerCase().includes(text.toLowerCase()))
            if (tmpMerchant.length == 0) throw 'MERCHANT_NOT_FOUND';
            setFilteredCategory(tmpMerchant)
            setMerchantLoading(false)
            tmpMerchant = []
        } catch (err) {
            log('_filterMerchant : ', err);
            setMerchantError(err)
            setMerchantLoading(false)
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
        merchantLoading,
        setMerchantLoading,
        merchantError,
        searchQuery,
        setSearchQuery,
        _filterCategory,
        filteredCategory,
        _clearFilteredCategory
    }
}

