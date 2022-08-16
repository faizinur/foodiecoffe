import { Merchant, Auth, Product } from '@Model';
import React, { useState, useCallback, useMemo } from 'react';
import { log } from '@Utils';
export default () => {
    const { getMerchantCategory } = Merchant;
    const { getProductList } = Product;
    const { getUserData } = Auth;
    const [merchantList, setMerchantList] = useState([])
    const [merchantError, setMerchantError] = useState('');
    const [merchantLoading, setMerchantLoading] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [filteredCategory, setFilteredCategory] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');

    const _getMerchant = useMemo(() => async () => {
        try {
            log('_getMerchant')
            setMerchantLoading(true)
            setMerchantError('')
            const userData = await getUserData();
            if (userData == null) return Promise.reject(`userData null`);
            const { status, data, message } = await getMerchantCategory(userData.user.merchantId);
            if (status != 'SUCCESS') throw message;
            setMerchantList(data)
            setMerchantLoading(false)
        } catch (err) {
            setMerchantError(`error Merchant ${err}`)
            setMerchantLoading(false)
            global.showToast(err);
        }
    }, [merchantList])

    const _getCategoryList = useMemo(() => async (selectedCategoryId) => {
        try {
            setMerchantLoading(true)
            setMerchantError('')
            const data = await getProductList();
            setCategoryList(
                data.map(item => ({ ...item, ...{ notes: null, count: 0 } }))
                    .sort((prev, next) => prev.id < next.id)
                    .filter(({ categoryId }) => categoryId == selectedCategoryId)
            )
            setMerchantLoading(false)
        } catch (err) {
            log('getProductList : ', err)
            setMerchantError(err)
            global.showToast(err);
            setMerchantLoading(false)
        }
    }, [categoryList])

    const memoizedTotalPrice = useMemo(() => {
        return categoryList.filter(({ count }) => count > 0)
            .map(({ count, price }) => ({ sumPrice: parseInt(count) * parseFloat(price) }))
            .reduce((acc, { sumPrice }) => acc + sumPrice, 0)
    }, [categoryList])

    const memoizedCartCategoryList = useMemo(() => {
        return categoryList.filter(({ count }) => count > 0)
            .map(({ count, price, name, notes }) => ({ count, sumPrice: parseInt(count) * parseFloat(price), name, notes }))
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
            global.showToast(err);
            setMerchantLoading(false)
        }
    }, [searchQuery, filteredCategory, merchantList])

    const _clearFilteredCategory = useCallback(() => {
        setFilteredCategory([])
        setSearchQuery('')
        setMerchantError('')

    }, [searchQuery, filteredCategory])

    const _onBucketChanged = useCallback((updatedValue) => {
        let index = categoryList.findIndex(({ id }) => id === updatedValue.id);
        if (index < 0) return false;
        delete updatedValue.id;
        let tmpCategoryList = [...categoryList]
        log(updatedValue)
        Object.keys(updatedValue).map(key => {
            tmpCategoryList[index][key] = updatedValue[key]
        })
        log('_onBucketChanged', tmpCategoryList[index].notes)
        setCategoryList(tmpCategoryList)
    }, [categoryList])

    return {
        _getMerchant,
        _getCategoryList,
        merchantList,
        categoryList,
        setCategoryList,
        merchantLoading,
        setMerchantLoading,
        merchantError,
        searchQuery,
        setSearchQuery,
        _filterCategory,
        filteredCategory,
        _clearFilteredCategory,
        _onBucketChanged,
        memoizedTotalPrice,
        memoizedCartCategoryList,
    }
}

