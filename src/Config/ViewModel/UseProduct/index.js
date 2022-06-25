import { Product } from '@Model';
const { getListProduct } = Product;
import { log, MyRealm } from '@Utils';
import { useState } from 'react';
export default () => {
    const [productError, setProductError] = useState('');
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [productList, setProductList] = useState([]);

    const _getDaftarProduct = async () => {
        try {
            log('_getDaftarProduct')
            setLoadingProduct(true)
            setProductError('')
            const { status, data, message } = await getListProduct('B1778H');
            if (status != 'SUCCESS') throw message;
            setProductList(data)
            await MyRealm.insertProduct(data)
            setLoadingProduct(false)
        } catch (err) {
            log(err)
            setProductError(`error Merchant ${err}`)
            setLoadingProduct(false)
        }
    }

    return {
        productError,
        loadingProduct,
        productList,
        _getDaftarProduct,
        setProductError,
        setLoadingProduct
    }
}
