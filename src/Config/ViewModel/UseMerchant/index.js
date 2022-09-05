import { Merchant, Auth, Product } from '@Model';
import React, { useState, useCallback, useMemo } from 'react';
import { log, MyRealm } from '@Utils';
import { ORDER } from '@Utils/Realm/types';
import moment from 'moment';
import { navigate } from '@RootNavigation';
export default (params = null) => {
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
                data.map(item => ({ ...item, ...{ notes: null, qty: 0 } }))
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

    const _onRefreshCategory = useCallback(() => {
        _getCategoryList(params);
        setMerchantLoading(true);
        setTimeout(() => setMerchantLoading(false), 3000);
    }, [merchantLoading])

    const memoizedTotalPrice = useMemo(() => {
        return categoryList.filter(({ qty }) => qty > 0)
            .map(({ qty, price }) => ({ totalPrice: parseInt(qty) * parseFloat(price) }))
            .reduce((acc, { totalPrice }) => acc + totalPrice, 0)
    }, [categoryList])

    const memoizedCartCategoryList = useMemo(() => {
        return categoryList.filter(({ qty }) => qty > 0)
            .map((category) => ({
                ...category,
                name: category?.name,
                notes: category?.notes,
                discount: 0,
                information: '',
                menuId: category?.id,
                menuName: category?.name,
                totalAddons: 0,
                totalOptions: 0,
                totalPrice: parseInt(category?.qty) * parseFloat(category?.price),
            }))
    }, [categoryList])

    const _clickMerchantOrder = async () => {
        try {

            if (memoizedTotalPrice == 0) return false;
            let merchantOrder = // await MyRealm.insertData(ORDER,
            {
                createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
                discount: 0,
                invoice: "INV/011/2212068155/2",
                items: memoizedCartCategoryList,
                merchantId: "undefined yet",
                merchantName: "undefined yet",
                name: '',
                paid: 0,
                ppn: 0,
                status: "undefined yet",
                subTotal: 31000,
                tableId: params?.tableId,
                tableNumber: "MC2",
                total: memoizedTotalPrice,
                type: "dinein"
            }
            // );
            navigate('DetailOrder', {
                order: { ...merchantOrder },
                title: "Konfirmasi Pembayaran",
            })
        } catch (e) {
            log(`_clickMerchantOrder : ${e}`)
        }
    }

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

    const _filterProduct = (sortType, discount) => {
        log('_filterProduct : ', sortType, discount)
    }

    const _onBucketChanged = useCallback((updatedValue) => {
        let index = categoryList.findIndex(({ id }) => id === updatedValue.id);
        if (index < 0) return false;
        delete updatedValue.id;
        let tmpCategoryList = [...categoryList]
        log('_onBucketChanged', updatedValue)
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
        _clickMerchantOrder,
        _onRefreshCategory,
        _filterProduct,
    }
}

