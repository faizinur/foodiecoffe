import { DaftarProdct } from '@Model';
const { getListProduct } = DaftarProdct;
import { log } from '@Utils';
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
            setLoadingProduct(false)
        } catch (err) {
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
