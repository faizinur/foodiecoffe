import { Product, Auth } from '@Model';
const { getListProduct, setProductAvalability, getProductList } = Product;
import { log, MyRealm } from '@Utils';
import { PRODUCT } from '@Utils/Realm/types';
import { useState } from 'react';
export default () => {
    const { getUserData } = Auth;
    const [productError, setProductError] = useState('');
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [productList, setProductList] = useState([]);

    const _getDaftarProduct = async () => {
        try {
            let products = await getProductList()
            log('_getDaftarProduct')
            setLoadingProduct(true)
            setProductError('')
            if (products.length > 0) {
                log('DATA PRODUCT UDAH ADA!')
                setProductList(products.sort((prev, next) => prev.id < next.id));
            } else {
                log('DATA PRODUCT AMBIL KE BACKEND!')
                const userData = await getUserData();
                if (userData == null) return Promise.reject(`userData null`);
                const { status, data, message } = await getListProduct(userData.user.merchantId);
                if (status != 'SUCCESS') throw message;
                setProductList(data.sort((prev, next) => prev.id < next.id))
                await MyRealm.insertData(PRODUCT, data)
            }
            setLoadingProduct(false)
        } catch (err) {
            log(err)
            setProductError(`error Merchant ${err}`);
            setLoadingProduct(false)
            global.showToast(err);
        }
    }

    const _setProductavalability = async product => {
        try {
            let result = await setProductAvalability(product);
            setProductList(data.sort((prev, next) => prev.id < next.id))
            log(result)
        } catch (err) {
            log(err)

        }
    }

    const _getProduct = async menuId => {
        try {
            const product = await MyRealm.selectData("PRODUCT", data => data.filter(({ id }) => id == menuId));
            if (product.length == 0) return null;
            return product[0]?.image?.url || 'https://via.placeholder.com/150';
        } catch (err) {
            log('useProduct _getProduct', err)
            return null;
        }
    }

    return {
        productError,
        loadingProduct,
        productList,
        _getDaftarProduct,
        setProductError,
        setLoadingProduct,
        _setProductavalability,
        _getProduct,
    }
}
