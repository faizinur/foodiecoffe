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
                data.map(item => ({
                    ...item, ...{
                        notes: {},
                        qty: 0,
                        subTotal: {
                            Addons: [],
                            Options: [],
                        }
                    }
                }))
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
        setMerchantLoading(true);
        _getCategoryList(params);
        setTimeout(() => setMerchantLoading(false), 3000);
    }, [merchantLoading])

    const memoizedCartCategoryList = useMemo(() => {
        let subTotalAddons = 0;
        let subTotalOptions = 0;
        let subTotalPrice = 0;
        let items = categoryList.filter(({ qty }) => qty > 0)
            .map((category) => {
                subTotalAddons = category?.subTotal.Addons.reduce((acc, val) => parseInt(acc) + parseInt(val), 0) * parseInt(category?.qty)
                subTotalOptions = category?.subTotal.Options.reduce((acc, val) => parseInt(acc) + parseInt(val), 0) * parseInt(category?.qty)
                subTotalPrice = (parseFloat(category?.price) * parseInt(category?.qty)) + (parseInt(subTotalAddons) + parseInt(subTotalOptions))
                return {
                    ...category,
                    name: category?.name,
                    notes: category?.notes,
                    discount: 0,
                    information: '',
                    menuId: category?.id,
                    menuName: category?.name,
                    totalAddons: subTotalAddons,
                    totalOptions: subTotalOptions,
                    totalPrice: subTotalPrice,
                }
            })
        let totalPrice = items.reduce((acc, val) => parseInt(acc) + parseInt(val.totalPrice), 0) || 0;
        let totalAddons = items.reduce((acc, val) => parseInt(acc) + parseInt(val.totalAddons), 0) || 0;
        let totalOptions = items.reduce((acc, val) => parseInt(acc) + parseInt(val.totalOptions), 0) || 0;
        return {
            items,
            totalPrice,
            totalAddons,
            totalOptions,
        }
    }, [categoryList])

    const _countSubTotalPrice = (lists, param) => {
        Object.keys(param).map(key => {
            if (param[key] === undefined) delete param[key]
        })
        return lists.filter(({ name }) => Object.keys(param).includes(name))
            .map(({ list }) => {
                return list.filter(({ name }) => Object.values(param).includes(name)).map(({ price }) => price)
            }).flatMap(num => num)
    }

    const _clickMerchantOrder = async () => {
        try {
            let merchantOrder = await MyRealm.insertData(ORDER,
                {
                    id: MyRealm._newBSON(),
                    createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
                    discount: 0,
                    invoice: "INV/011/2212068155/2",
                    items: memoizedCartCategoryList?.items,
                    merchantId: params?.categoryId,
                    merchantName: params?.name,
                    name: '',
                    paid: 0,
                    ppn: 0,
                    status: "process",
                    subTotal: 0,
                    tableId: params?.tableId,
                    tableNumber: params?.tableId,
                    total: memoizedCartCategoryList?.totalPrice,
                    totalAddons: memoizedCartCategoryList?.totalAddons,
                    totalOptions: memoizedCartCategoryList?.totalOptions,
                    type: "dinein",
                }
            );
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
        // log('_onBucketChanged', JSON.stringify(updatedValue))
        Object.keys(updatedValue).map(key => { tmpCategoryList[index][key] = updatedValue[key] });
        if (parseInt(updatedValue?.qty) == 0) {
            tmpCategoryList[index].notes = {}
            // log('_onBucketChanged', tmpCategoryList[index].notes)
        }
        setCategoryList(tmpCategoryList);
    }, [categoryList]);

    const _getDetailMerchantOrder = useCallback(async () => {
        let selectedData = {};
        log('_getDetailMerchantOrder : ', params?.order?.status)
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
        _countSubTotalPrice,
    }
}