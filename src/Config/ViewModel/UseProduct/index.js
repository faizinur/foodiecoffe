import { Product, Auth } from '@Model';
const { getListProduct, setProductAvalability, getProductList } = Product;
import { log, MyRealm } from '@Utils';
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
            // cek apakah udah ada produk, kalau udah ada yaudah gak usah ambil ke backend, kalau mau data terbaru yaudah login ulang, 
            // lagian pas di menu data bisa diupdate ke local db dan harusnya ke server juga
            if (products.length > 0) {
                log('DATA PRODUCT UDAH ADA!')
                setProductList(products.sort((prev, next) => prev.id < next.id));
            } else {
                log('DATA PRODUCT AMBIL KE BACKEND!')
                const { user: { merchantId } } = await getUserData();
                const { status, data, message } = await getListProduct(merchantId);
                if (status != 'SUCCESS') throw message;
                setProductList(data.sort((prev, next) => prev.id < next.id))
                await MyRealm.insertProduct(data)
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
            log(result)
        } catch (err) {
            log(err)

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
    }
}
