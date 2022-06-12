import { DaftarProdct } from '@Model';
const { getListProduct } = DaftarProdct;
import { log } from '@Utils';
import { useState } from 'react';
let PRODUCT_LIST = [];
export default () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [productList, setProductList] = useState([]);

    const _getDaftarProduct = async () => {
        if (loading == true) {
            log('lagi kerja')
            return false;
        }
        try {
            PRODUCT_LIST = await getListProduct();
            setLoading(true);
            setError('')
            setTimeout(() => {
                setProductList(PRODUCT_LIST);
                setLoading(false);
                PRODUCT_LIST = [];
            }, 500)
        } catch (e) {
            log(e)
            setError(e);
        }
    }

    return {
        error,
        loading,
        productList,
        _getDaftarProduct,
    }
}

