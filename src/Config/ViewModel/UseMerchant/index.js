import { Merchant, Auth, Product } from '@Model';
import { useState, useCallback, useMemo } from 'react';
import { log, MyRealm } from '@Utils';
import { ORDER, TRANSACTION, NEW_ORDER } from '@Utils/Realm/types';
import moment from 'moment';
import { navigate, reset, back } from '@RootNavigation';
export default (params = null) => {
    const { getMerchantCategory } = Merchant;
    const { getProductList } = Product;
    const { getUserData } = Auth;
    const [merchantList, setMerchantList] = useState([])
    const [merchantError, setMerchantError] = useState('');
    const [merchantLoading, setMerchantLoading] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [filteredCategory, setFilteredCategory] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [orderDetail, setOrderDetail] = useState({})

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
                data.map(item => ({ ...item, ...{ notes: {}, qty: 0 } }))
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
            .map(({ qty, price, notes }) => ({
                totalPrice: (parseInt(qty) * parseFloat(price)) + Object.keys(notes || {})
                    .filter(key => key.includes('Price'))
                    .map((key) => notes[key])
                    .reduce((acc, val) => parseInt(acc) + parseInt(val), 0)
            }))
            .reduce((acc, { totalPrice }) => parseInt(acc) + parseInt(totalPrice), 0)
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

    const memoizedTotalAddons = useMemo(() => {
        // log('memoizedTotalAddons')
        let total = [...categoryList].filter(({ qty, addons }) => (qty > 0 && addons.length > 0))
            .map(({ addons, notes }) => ({ addons: addons.map(({ name }) => `${name}Price`), notes }))
        //     .map(({ addons, notes }) => (addons.map(({ name }) => {
        //         log(`${name}Price`)
        //         return `${name}Price` in notes ? notes[`${name}Price`] : 0;
        //     })))
        // .reduce((acc, val) => {
        //     log(acc, val)
        // }, 0)
        // log(JSON.stringify(total))
        return 0;
    }, [categoryList])

    const _clickMerchantOrder = async () => {
        try {
            if (memoizedTotalPrice == 0) return false;
            let merchantOrder = await MyRealm.insertData(ORDER, {
                id: MyRealm._newBSON(),
                createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
                discount: 0,
                invoice: "INV/011/2212068155/2",
                items: memoizedCartCategoryList,
                merchantId: params?.categoryId,
                merchantName: params?.name,
                name: '',
                paid: 0,
                ppn: 0,
                status: "process",
                subTotal: 31000,
                tableId: params?.tableId,
                tableNumber: params?.tableId,
                total: memoizedTotalPrice,
                totalAddons: 100,
                totalOptions: 100,
                type: "dinein",
            });
            navigate('DetailOrder', { order: { id: merchantOrder[0]?.id, status: 'new' }, title: "Konfirmasi Pembayaran" })
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
        let tmpCategoryList = [...categoryList];
        // log('_onBucketChanged', updatedValue?.notes)
        Object.keys(updatedValue).map(key => { tmpCategoryList[index][key] = updatedValue[key] });
        if (parseInt(updatedValue?.qty) == 0) {
            tmpCategoryList[index].notes = {}
            tmpCategoryList[index].addons.map(addon => {
                addon?.list?.map(itemList => {
                    itemList.available = false;
                    return itemList;
                })
                return addon
            })
            log(JSON.stringify(tmpCategoryList[index].addons))
            // log('_onBucketChanged', tmpCategoryList[index].notes)
        }
        setCategoryList(tmpCategoryList);
    }, [categoryList]);

    const _getDetailMerchantOrder = useCallback(async () => {
        let selectedData = {};
        const filteredSelect = products => products.filter(({ id }) => id == params?.order?.id)
        switch (params?.order?.status) {
            case "success":
                selectedData = await MyRealm.selectData(TRANSACTION, filteredSelect);
                setOrderDetail(selectedData[0] || {});
                break;
            case "incoming":
                selectedData = await MyRealm.selectData(NEW_ORDER, filteredSelect);
                setOrderDetail(selectedData[0] || {});
                break;
            case "new":
                selectedData = await MyRealm.selectData(ORDER, filteredSelect);
                setOrderDetail(selectedData[0] || {});
                break;
        }
        selectedData = {};
    }, [orderDetail]);

    const _onOrderChangeName = async name => {
        try {
            await MyRealm.updateData(ORDER, {
                id: params?.order?.id,
                name,
            });
        } catch (e) {
            log(`_onConfirm ERR : ${e}`)
        }
    }

    const _onConfirm = useCallback(async (status) => {
        try {
            if (status == 'reject') {
                if (params?.order?.status == 'new') await MyRealm.deleteData(ORDER, params?.order?.id);
            } else {
                log('update namanya ')
            }
            setOrderDetail({})
        } catch (e) {
            log(`_onConfirm ERR : ${e}`)
        } finally {
            params?.order?.status == 'incoming' ? back() : reset('Home');
        }
    }, [orderDetail])

    const _acceptAction = async () => {
        try {
            log('sedang melakukan sesuatu selama 10 detik')
            await new Promise(resolve => setTimeout(resolve, 10000));
        } catch (e) {
            log('_acceptAction', e)
        }
    }

    const _rejectAction = async () => {
        try {
            log('sedang melakukan sesuatu selama 1.5 detik')
            await new Promise(resolve => setTimeout(resolve, 1500));
        } catch (e) {
            log('_rejectAction', e)
        }
    }

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
        _getDetailMerchantOrder,
        orderDetail,
        _onConfirm,
        _onOrderChangeName,
        _acceptAction,
        _rejectAction,
    }
}

