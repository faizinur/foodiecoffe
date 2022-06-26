import { Product, Auth } from '@Model';
const { getListProduct } = Product;
import { log, MyRealm } from '@Utils';
import { useState } from 'react';
export default () => {
    const { getUserData } = Auth;
    const [productError, setProductError] = useState('');
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [productList, setProductList] = useState([]);

    const _getDaftarProduct = async () => {
        try {
            log('_getDaftarProduct')
            setLoadingProduct(true)
            setProductError('')
            const { user: { merchantId } } = await getUserData();
            const { status, data, message } = await getListProduct(merchantId);
            if (status != 'SUCCESS') throw message;
            log('TOTAL PRODUK ADA ', data.length, 'TAPI REALMNYA BELUM BENER JADI BEUM DITAMPILIN')
            // setProductList(data.map(product => ({
            //     ...product,
            //     ...{
            //         image: JSON.stringify(product.image),
            //         options: JSON.stringify({ ...product.options, enable: false }),
            //         addons: JSON.stringify({ ...product.addons, enable: false }),
            //     }
            // })))
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
